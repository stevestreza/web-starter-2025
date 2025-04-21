module.exports = {
	root: true,
	env: {
		node: true,
		es2022: true
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: ['@typescript-eslint'],
	rules: {
		'semi': ['error', 'never'],
		'quotes': ['error', 'backtick'],
		'indent': ['error', 'tab'],
		'@typescript-eslint/semi': ['error', 'never'],
		'@typescript-eslint/quotes': ['error', 'backtick']
	}
} 