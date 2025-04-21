import { Context, Next } from 'koa'
import { prisma } from '../lib/prisma'
import { logger } from '../lib/logger'

const requestLogger = logger.child({ context: `request` })

export const logRequest = async (ctx: Context, next: Next) => {
	logger.debug({ context: ctx }, "Request");
	await next();
}

