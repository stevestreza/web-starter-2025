module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended'
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	rules: {
		'semi': ['error', 'never'],
		'quotes': ['error', 'backtick'],
		'indent': ['error', 'tab'],
		'@typescript-eslint/semi': ['error', 'never'],
		'@typescript-eslint/quotes': ['error', 'backtick']
	},
	overrides: [
		{
			files: ['frontend/**/*.{ts,tsx}'],
			env: {
				browser: true
			},
			extends: [
				'plugin:react/recommended',
				'plugin:react-hooks/recommended'
			],
			plugins: ['react', 'react-hooks'],
			parserOptions: {
				ecmaFeatures: {
					jsx: true
				}
			},
			settings: {
				react: {
					version: 'detect'
				}
			},
			rules: {
				'react/react-in-jsx-scope': 'off',
				'react/no-unescaped-entities': 'off'
			}
		},
		{
			files: ['backend/**/*.ts'],
			env: {
				node: true
			}
		}
	]
}
