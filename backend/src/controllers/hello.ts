import { Context } from 'koa'

export const getHello = async (ctx: Context) => {
	ctx.body = { "hello": "world" };
}
