import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<unknown>): Promise<void> {
	await db.schema
		.createTable(`users`)
		.addColumn(`id`, `text`, (col) => col.primaryKey())
		.addColumn(`email`, `text`, (col) => col.notNull().unique())
		.addColumn(`username`, `text`, (col) => col.notNull().unique())
		.addColumn(`password`, `text`, (col) => col.notNull())
		.addColumn(`createdAt`, `timestamp`, (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull())
		.addColumn(`updatedAt`, `timestamp`, (col) => col.notNull())
		.execute()
}

export async function down(db: Kysely<unknown>): Promise<void> {
	await db.schema.dropTable(`users`).execute()
}
