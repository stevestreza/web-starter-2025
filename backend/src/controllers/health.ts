import { Context } from 'koa';

export const getHealth = async (ctx: Context): Promise<void> => {
  ctx.status = 200;
  ctx.body = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'backend-api'
  };
}; 