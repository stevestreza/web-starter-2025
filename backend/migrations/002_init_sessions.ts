import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<unknown>): Promise<void> {
	await db.schema
		.createTable(`sessions`)
		.addColumn(`id`, `text`, (col) => col.primaryKey())
		.addColumn(`userId`, `text`, (col) => col.notNull().references(`users.id`).onDelete(`cascade`).onUpdate(`cascade`))
		.addColumn(`token`, `text`, (col) => col.notNull().unique())
		.addColumn(`createdAt`, `timestamp`, (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
		.addColumn(`expiresAt`, `timestamp`, (col) => col.notNull())
		.execute()
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable(`sessions`).execute()
}
