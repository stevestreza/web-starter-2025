import { Context, Next } from 'koa'
import { logger } from '../lib/logger'

const requestLogger = logger.child({ context: `request` })

export const logRequest = async (ctx: Context, next: Next) => {
	requestLogger.debug({ context: ctx }, "Request");
	await next();
}

