module.exports = {
	root: true,
	env: {
		browser: true,
		es2022: true
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:solid/typescript'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true
		}
	},
	plugins: ['@typescript-eslint', 'solid'],
	rules: {
		'semi': ['error', 'never'],
		'quotes': ['error', 'backtick'],
		'indent': ['error', 'tab'],
		'@typescript-eslint/semi': ['error', 'never'],
		'@typescript-eslint/quotes': ['error', 'backtick']
	}
} 