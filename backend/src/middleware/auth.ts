import { Context, Next } from 'koa'
import { prisma } from '../lib/prisma'

export const requireAuth = async (ctx: Context, next: Next) => {
	const token = ctx.cookies.get(`auth_token`)

	if (!token) {
		ctx.status = 401
		ctx.body = { error: `Authentication required` }
		return
	}

	try {
		const session = await prisma.session.findUnique({
			where: { token },
			include: { user: true }
		})

		if (!session || session.expiresAt < new Date()) {
			ctx.status = 401
			ctx.body = { error: `Session expired` }
			return
		}

		ctx.state.user = session.user
		await next()
	} catch (error) {
		ctx.status = 401
		ctx.body = { error: `Invalid session` }
	}
} 