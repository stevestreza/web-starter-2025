import { Context } from 'koa'
import * as argon2 from 'argon2'
import jwt from 'jsonwebtoken'
import { prisma } from '../lib/prisma'
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

		const user = await prisma.user.create({
			data: {
				email,
				username,
				password: hashedPassword
			}
		})

		logger.info({ userId: user.id, email: user.email }, `User registered successfully`)

		const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: `7d` })
		
		await prisma.session.create({
			data: {
				userId: user.id,
				token,
				expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
			}
		})

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
		const user = await prisma.user.findUnique({ where: { email } })
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
		
		await prisma.session.create({
			data: {
				userId: user.id,
				token,
				expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
			}
		})

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
			await prisma.session.deleteMany({
				where: { token }
			})
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
		const session = await prisma.session.findUnique({
			where: { token },
			include: { user: true }
		})

		if (!session || session.expiresAt < new Date()) {
			logger.warn({ token }, `Attempted to use expired or invalid session`)
			ctx.status = 401
			ctx.body = { error: `Session expired` }
			return
		}

		logger.debug({ userId: session.user.id }, `Current user retrieved successfully`)

		const { user } = session
		ctx.body = {
			id: user.id,
			email: user.email,
			username: user.username
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