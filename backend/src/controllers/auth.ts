import { Context } from 'koa'
import * as argon2 from 'argon2'
import jwt from 'jsonwebtoken'
import { kysely } from '../lib/database'
import { authLogger as logger } from '../lib/logger'

const JWT_SECRET = process.env.JWT_SECRET || `your-secret-key`

export const register = async (ctx: Context) => {
	const { email, username, password } = ctx.request.body as {
		email: string
		username: string
		password: string
	}

	logger.debug({ email, username }, `Attempting to register new user`)

	try {
		const hashedPassword = await argon2.hash(password, {
			type: argon2.argon2id,
			memoryCost: 256 * 1024 * 1024,
			timeCost: 3,
			parallelism: 4
		})

		const user = await kysely
			.insertInto(`users`)
			.values({
				id: crypto.randomUUID(),
				email,
				username,
				password: hashedPassword,
				createdAt: new Date(),
				updatedAt: new Date()
			})
			.returningAll()
			.executeTakeFirstOrThrow()

		logger.info({ userId: user.id, email: user.email }, `User registered successfully`)

		const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: `7d` })
		
		await kysely
			.insertInto(`sessions`)
			.values({
				id: crypto.randomUUID(),
				userId: user.id,
				token,
				createdAt: new Date(),
				expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
			})
			.execute()

		logger.debug({ userId: user.id }, `Session created for new user`)

		ctx.cookies.set(`auth_token`, token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === `production`,
			sameSite: `strict`,
			maxAge: 7 * 24 * 60 * 60 * 1000
		})

		ctx.status = 201
		ctx.body = {
			id: user.id,
			email: user.email,
			username: user.username
		}
	} catch (error) {
		logger.error(
			{ error: error instanceof Error ? error.message : `Unknown error`, email },
			`Failed to register user`
		)
		ctx.status = 400
		ctx.body = { error: `Failed to create user` }
	}
}

export const login = async (ctx: Context) => {
	const { email, password } = ctx.request.body as {
		email: string
		password: string
	}

	logger.debug({ email }, `Login attempt`)

	try {
		const user = await kysely
			.selectFrom(`users`)
			.selectAll()
			.where(`email`, `=`, email)
			.executeTakeFirst()

		if (!user) {
			logger.warn({ email }, `Login attempt with non-existent email`)
			ctx.status = 401
			ctx.body = { error: `Invalid credentials` }
			return
		}

		const validPassword = await argon2.verify(user.password, password)
		if (!validPassword) {
			logger.warn({ userId: user.id, email }, `Failed login attempt - invalid password`)
			ctx.status = 401
			ctx.body = { error: `Invalid credentials` }
			return
		}

		logger.info({ userId: user.id, email }, `User logged in successfully`)

		const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: `7d` })
		
		await kysely
			.insertInto(`sessions`)
			.values({
				id: crypto.randomUUID(),
				userId: user.id,
				token,
				createdAt: new Date(),
				expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
			})
			.execute()

		logger.debug({ userId: user.id }, `New session created`)

		ctx.cookies.set(`auth_token`, token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === `production`,
			sameSite: `strict`,
			maxAge: 7 * 24 * 60 * 60 * 1000
		})

		ctx.body = {
			id: user.id,
			email: user.email,
			username: user.username
		}
	} catch (error) {
		logger.error(
			{ error: error instanceof Error ? error.message : `Unknown error`, email },
			`Server error during login`
		)
		ctx.status = 500
		ctx.body = { error: `Server error` }
	}
}

export const logout = async (ctx: Context) => {
	const token = ctx.cookies.get(`auth_token`)
	
	if (token) {
		try {
			await kysely
				.deleteFrom(`sessions`)
				.where(`token`, `=`, token)
				.execute()
			logger.info({ token }, `User session terminated`)
		} catch (error) {
			logger.error(
				{ error: error instanceof Error ? error.message : `Unknown error`, token },
				`Error during logout`
			)
		}
		
		ctx.cookies.set(`auth_token`, null)
	}
	
	ctx.status = 200
	ctx.body = { message: `Logged out successfully` }
}

export const getCurrentUser = async (ctx: Context) => {
	const token = ctx.cookies.get(`auth_token`)
	
	if (!token) {
		logger.debug(`Attempted to get current user without token`)
		ctx.status = 401
		ctx.body = { error: `Not authenticated` }
		return
	}

	try {
		const session = await kysely
			.selectFrom(`sessions`)
			.innerJoin(`users`, `users.id`, `sessions.userId`)
			.selectAll()
			.where(`sessions.token`, `=`, token)
			.executeTakeFirst()

		if (!session || session.expiresAt < new Date()) {
			logger.warn({ token }, `Attempted to use expired or invalid session`)
			ctx.status = 401
			ctx.body = { error: `Session expired` }
			return
		}

		logger.debug({ userId: session.userId }, `Current user retrieved successfully`)

		ctx.body = {
			id: session.id,
			email: session.email,
			username: session.username
		}
	} catch (error) {
		logger.error(
			{ error: error instanceof Error ? error.message : `Unknown error` },
			`Error retrieving current user`
		)
		ctx.status = 500
		ctx.body = { error: `Server error` }
	}
}