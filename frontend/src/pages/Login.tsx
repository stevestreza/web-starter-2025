import { useState } from 'react'
import { useNavigate } from 'react-router'
import { login } from '../services/auth'

export default function Login() {
    const navigate = useNavigate()
	const [error, setError] = useState(``)
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (formData: FormData) => {
		setError(``)
		setLoading(true)

		const data = {
			email: formData.get(`email`) as string,
			password: formData.get(`password`) as string,
		}

		try {
			const response = await login(data)
			if (`error` in response) {
				setError(response.error)
			} else {
				navigate(`/`)
			}
		} catch (err) {
			setError(`Failed to login`)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="max-w-md mx-auto space-y-8">
			<div className="text-center">
				<h1 className="text-3xl font-bold text-text-primary dark:text-text-primary-dark">Login</h1>
				<p className="text-text-secondary dark:text-text-secondary-dark mt-2">Welcome back</p>
			</div>

			<form action={handleSubmit} className="space-y-6 bg-surface dark:bg-surface-dark p-8 rounded-lg border border-border dark:border-border-dark">
				<div>
					<label htmlFor="email" className="block text-sm font-medium text-text-primary dark:text-text-primary-dark">
						Email
					</label>
					<input
						id="email"
						name="email"
						type="email"
						required
						className="mt-1 block w-full rounded-md bg-background dark:bg-background-dark border-border dark:border-border-dark text-text-primary dark:text-text-primary-dark px-3 py-2 focus:ring-2 focus:ring-accent dark:focus:ring-accent-dark focus:border-accent dark:focus:border-accent-dark"
					/>
				</div>

				<div>
					<label htmlFor="password" className="block text-sm font-medium text-text-primary dark:text-text-primary-dark">
						Password
					</label>
					<input
						id="password"
						name="password"
						type="password"
						required
						className="mt-1 block w-full rounded-md bg-background dark:bg-background-dark border-border dark:border-border-dark text-text-primary dark:text-text-primary-dark px-3 py-2 focus:ring-2 focus:ring-accent dark:focus:ring-accent-dark focus:border-accent dark:focus:border-accent-dark"
					/>
				</div>

				{error && (
					<div className="text-red-500 dark:text-red-400 text-sm">{error}</div>
				)}

				<button
					type="submit"
					disabled={loading}
					className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-accent dark:bg-accent-dark hover:bg-primary-700 dark:hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent dark:focus:ring-accent-dark disabled:opacity-50"
				>
					{loading ? `Logging in...` : `Login`}
				</button>

				<div className="text-center text-sm text-text-secondary dark:text-text-secondary-dark">
					Don't have an account?{` `}
					<a href="/register" className="text-accent dark:text-accent-dark hover:text-primary-700 dark:hover:text-primary-400">
						Register here
					</a>
				</div>
			</form>
		</div>
	)
} 