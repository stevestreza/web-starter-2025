import { useState } from 'react'
import { useNavigate } from 'react-router'
import { register } from '../services/auth'

export default function Register() {
	const navigate = useNavigate()
	const [error, setError] = useState(``)
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (e: Event) => {
		e.preventDefault()
		setError(``)
		setLoading(true)

		const form = e.target as HTMLFormElement
		const formData = new FormData(form)
		
		const data = {
			email: formData.get(`email`) as string,
			username: formData.get(`username`) as string,
			password: formData.get(`password`) as string,
		}

		try {
			const response = await register(data)
			if (`error` in response) {
				setError(response.error)
			} else {
				navigate(`/`)
			}
		} catch (err) {
			setError(`Failed to register`)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="max-w-md mx-auto space-y-8">
			<div className="text-center">
				<h1 className="text-3xl font-bold text-nebula-purple-100">Register</h1>
				<p className="text-nebula-blue-200 mt-2">Create your account</p>
			</div>

			<form onSubmit={handleSubmit} className="space-y-6 bg-space-400 p-8 rounded-lg">
				<div>
					<label for="email" className="block text-sm font-medium text-nebula-purple-200">
						Email
					</label>
					<input
						id="email"
						name="email"
						type="email"
						required
						className="mt-1 block w-full rounded-md bg-space-300 border-space-200 text-nebula-purple-100 px-3 py-2"
					/>
				</div>

				<div>
					<label for="username" className="block text-sm font-medium text-nebula-purple-200">
						Username
					</label>
					<input
						id="username"
						name="username"
						type="text"
						required
						className="mt-1 block w-full rounded-md bg-space-300 border-space-200 text-nebula-purple-100 px-3 py-2"
					/>
				</div>

				<div>
					<label for="password" className="block text-sm font-medium text-nebula-purple-200">
						Password
					</label>
					<input
						id="password"
						name="password"
						type="password"
						required
						className="mt-1 block w-full rounded-md bg-space-300 border-space-200 text-nebula-purple-100 px-3 py-2"
					/>
				</div>

				{error && (
					<div className="text-nebula-red-500 text-sm">{error}</div>
				)}

				<button
					type="submit"
					disabled={loading}
					className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-nebula-purple-100 bg-nebula-purple-600 hover:bg-nebula-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nebula-purple-500 disabled:opacity-50"
				>
					{loading ? `Registering...` : `Register`}
				</button>

				<div className="text-center text-sm text-nebula-blue-200">
					Already have an account?{` `}
					<a href="/login" className="text-nebula-purple-400 hover:text-nebula-purple-300">
						Login here
					</a>
				</div>
			</form>
		</div>
	)
} 