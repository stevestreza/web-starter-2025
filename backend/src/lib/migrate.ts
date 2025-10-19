import * as path from 'path'
import { Pool } from 'pg'
import { promises as fs } from 'fs'
import {
	Kysely,
	Migrator,
	PostgresDialect,
	FileMigrationProvider,
} from 'kysely'
import { Database } from './database'

async function migrateToLatest() {
	const pool = new Pool({
		connectionString: process.env.DATABASE_URL,
	})

	const db = new Kysely<Database>({
		dialect: new PostgresDialect({
			pool,
		}),
	})

	const migrator = new Migrator({
		db,
		provider: new FileMigrationProvider({
			fs,
			path,
			// This needs to be an absolute path.
			migrationFolder: path.join(__dirname, `../../migrations`),
		}),
	})

	const { error, results } = await migrator.migrateToLatest()

	results?.forEach((it) => {
		if (it.status === `Success`) {
			console.log(`migration "${it.migrationName}" was executed successfully`)
		} else if (it.status === `Error`) {
			console.error(`failed to execute migration "${it.migrationName}"`)
		}
	})

	if (error) {
		console.error(`failed to migrate`)
		console.error(error)
		process.exit(1)
	}

	await db.destroy()
}

// Export the migration function
export async function runMigrations() {
	await migrateToLatest()
}

// CLI runner
if (require.main === module) {
	runMigrations()
}