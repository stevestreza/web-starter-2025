module.exports = {
	root: true,
	env: {
		browser: true,
		es2022: true
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/typescript'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true
		}
	},
	plugins: ['@typescript-eslint', 'react'],
	rules: {
		'semi': ['error', 'always'],
		'quotes': ['error', 'backtick'],
		'indent': ['error', 'tab'],
		'@typescript-eslint/semi': ['error', 'always'],
		'@typescript-eslint/quotes': ['error', 'backtick']
	}
}
