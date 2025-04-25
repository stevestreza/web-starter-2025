import { PrismaClient } from '@prisma/client';
import { verify } from 'argon2';
import jwt from 'jsonwebtoken';
import { MyContext } from '../context';

const prisma = new PrismaClient();

interface LoginInput {
  email: string;
  password: string;
}

export const resolvers = {
  Query: {
    me: async (_: unknown, __: unknown, { user }: MyContext) => {
      if (!user) return null;
      return prisma.user.findUnique({
        where: { id: user.id },
        include: { sessions: true }
      });
    }
  },
  Mutation: {
    login: async (_: unknown, { email, password }: LoginInput) => {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) throw new Error('User not found');

      const validPassword = await verify(user.password, password);
      if (!validPassword) throw new Error('Invalid password');

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'your-secret-key', {
        expiresIn: '7d'
      });

      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);

      return prisma.session.create({
        data: {
          userId: user.id,
          token,
          expiresAt
        }
      });
    },
    logout: async (_: unknown, __: unknown, { user }: MyContext) => {
      if (!user) throw new Error('Not authenticated');
      
      await prisma.session.deleteMany({
        where: { userId: user.id }
      });
      
      return true;
    }
  }
}; 