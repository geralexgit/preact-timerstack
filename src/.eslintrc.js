module.exports = {
	env: {
		es2021: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint', 'prettier'],
	rules: {
		indent: [
			'warn',
			'tab',
			{
				SwitchCase: 1,
				ignoredNodes: ['PropertyDefinition'],
			},
		],
		'no-nested-ternary': 'error',
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['warn', 'never'],
		'no-empty': ['off'],
		'eol-last': ['warn', 'always'],
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		'object-curly-spacing': ['warn', 'always'],
		'@typescript-eslint/ban-types': 'off',
		'@typescript-eslint/no-namespace': 'off',
		'@typescript-eslint/no-var-requires': ['warn'],
		'prettier/prettier': 2, // Means error,
		'prefer-const': ['off'],
		'no-debugger': ['off'],
		'arrow-body-style': 'off',
		'prefer-arrow-callback': 'off',
	},
}
