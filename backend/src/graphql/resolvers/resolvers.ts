import { kysely } from '../../lib/database'
import { verify } from 'argon2'
import jwt from 'jsonwebtoken'
import { MyContext } from '../context'

interface LoginInput {
  email: string;
  password: string;
}

export const resolvers = {
	Query: {
		me: async (_: unknown, __: unknown, { user }: MyContext) => {
			if (!user) return null
			return kysely
				.selectFrom(`users`)
				.selectAll()
				.where(`id`, `=`, user.id)
				.executeTakeFirst()
		}
	},
	Mutation: {
		login: async (_: unknown, { email, password }: LoginInput) => {
			const user = await kysely
				.selectFrom(`users`)
				.selectAll()
				.where(`email`, `=`, email)
				.executeTakeFirst()
      
			if (!user) throw new Error(`User not found`)

			const validPassword = await verify(user.password, password)
			if (!validPassword) throw new Error(`Invalid password`)

			const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || `your-secret-key`, {
				expiresIn: `7d`
			})

			const expiresAt = new Date()
			expiresAt.setDate(expiresAt.getDate() + 7)

			return kysely
				.insertInto(`sessions`)
				.values({
					id: crypto.randomUUID(),
					userId: user.id,
					token,
					createdAt: new Date(),
					expiresAt
				})
				.returningAll()
				.executeTakeFirstOrThrow()
		},
		logout: async (_: unknown, __: unknown, { user }: MyContext) => {
			if (!user) throw new Error(`Not authenticated`)
      
			await kysely
				.deleteFrom(`sessions`)
				.where(`userId`, `=`, user.id)
				.execute()
      
			return true
		}
	}
}