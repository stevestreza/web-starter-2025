import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { KoaContextFunctionArgument } from '@as-integrations/koa';

const prisma = new PrismaClient();

export interface MyContext {
  prisma: PrismaClient;
  user?: {
    id: string;
  };
}

export const createContext = async ({ ctx }: KoaContextFunctionArgument): Promise<MyContext> => {
  const token = ctx.request.headers.authorization?.replace('Bearer ', '');
  
  let user = undefined;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as { userId: string };
      user = { id: decoded.userId };
    } catch (error) {
      // Token is invalid or expired
    }
  }

  return {
    prisma,
    user
  };
}; 