export type RegisterData = {
	email: string
	username: string
	password: string
}

export type LoginData = {
	email: string
	password: string
}

export type User = {
	id: string
	email: string
	username: string
}

export type AuthError = {
	error: string
} 