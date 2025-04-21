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
				'plugin:solid/typescript'
			],
			plugins: ['solid'],
			parserOptions: {
				ecmaFeatures: {
					jsx: true
				}
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