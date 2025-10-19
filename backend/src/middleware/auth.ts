import { Context, Next } from 'koa'
import { kysely } from '../lib/database'

export const requireAuth = async (ctx: Context, next: Next) => {
	const token = ctx.cookies.get(`auth_token`)

	if (!token) {
		ctx.status = 401
		ctx.body = { error: `Authentication required` }
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
			ctx.status = 401
			ctx.body = { error: `Session expired` }
			return
		}

		ctx.state.user = {
			id: session.userId,
			email: session.email,
			username: session.username
		}
		await next()
	} catch (error) {
		ctx.status = 401
		ctx.body = { error: `Invalid session` }
	}
}