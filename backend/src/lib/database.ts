import { Kysely, PostgresDialect } from 'kysely'
import { Pool } from 'pg'

// Database schema types
export interface Database {
  users: {
    id: string
    email: string
    username: string
    password: string
    createdAt: Date
    updatedAt: Date
  }
  sessions: {
    id: string
    userId: string
    token: string
    createdAt: Date
    expiresAt: Date
  }
}

// Create database connection
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
})

const db = new Kysely<Database>({
	dialect: new PostgresDialect({
		pool,
	}),
})

// Global database instance for development
const globalForDb = globalThis as unknown as {
  db: Kysely<Database> | undefined
}

export const kysely = globalForDb.db ?? db

if (process.env.NODE_ENV !== `production`) {
	globalForDb.db = kysely
}

export default kysely