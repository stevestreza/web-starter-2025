import { Hello } from '../types/hello'

const API_BASE = `/api`

export const getHello = async (): Promise<Hello> => {
	try {
		const response = await fetch(`${API_BASE}/hello`)

		const data = await response.json()

		if (!response.ok) {
			throw new Error(data.error || `Failed to fetch`)
		}

		// Type check the response
		if (!data || typeof data !== 'object' || !('id' in data)) {
			console.error('Invalid data:', data)
			throw new Error('Invalid data received from API')
		}

		const hello = data as Hello
		console.log('Parsed hello data:', hello)
		return hello

	} catch (error) {
		console.error('Error in getHello:', error)
		throw error
	}
}
