import { Context } from 'koa'
import { prisma } from '../lib/prisma'
import { logger } from '../lib/logger'

export const getHello = async (ctx: Context) => {
	ctx.body = { "hello": "world" };
}
