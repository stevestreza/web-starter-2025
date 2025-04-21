import { RegisterData, LoginData, User, AuthError } from '../types/auth'

const API_BASE = `/api/auth`

export const register = async (data: RegisterData): Promise<User | AuthError> => {
	const response = await fetch(`${API_BASE}/register`, {
		method: `POST`,
		headers: {
			'Content-Type': `application/json`,
		},
		body: JSON.stringify(data),
		credentials: `include`,
	})
	return response.json()
}

export const login = async (data: LoginData): Promise<User | AuthError> => {
	const response = await fetch(`${API_BASE}/login`, {
		method: `POST`,
		headers: {
			'Content-Type': `application/json`,
		},
		body: JSON.stringify(data),
		credentials: `include`,
	})
	return response.json()
}

export const logout = async (): Promise<void> => {
	await fetch(`${API_BASE}/logout`, {
		method: `POST`,
		credentials: `include`,
	})
}

export const getCurrentUser = async (): Promise<User | null> => {
	try {
		const response = await fetch(`${API_BASE}/me`, {
			credentials: `include`,
		})
		if (!response.ok) return null
		return response.json()
	} catch {
		return null
	}
} 