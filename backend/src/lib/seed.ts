import { kysely } from './database'
import * as argon2 from 'argon2'

async function main() {
	// Clear existing data
	await kysely.deleteFrom(`sessions`).execute()
	await kysely.deleteFrom(`users`).execute()

	// Create test user if not in production
	if (process.env.NODE_ENV !== `production`) {
		const hashedPassword = await argon2.hash(`test`, {
			type: argon2.argon2id,
			memoryCost: 65536,
			timeCost: 3,
			parallelism: 4
		})

		const testUser = await kysely
			.insertInto(`users`)
			.values({
				id: crypto.randomUUID(),
				email: `test@test.com`,
				username: `test`,
				password: hashedPassword,
				createdAt: new Date(),
				updatedAt: new Date()
			})
			.returningAll()
			.executeTakeFirst()

		if (testUser) {
			console.log(`Created test user:`, testUser.username)
		}
	}
}

main()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await kysely.destroy()
	})