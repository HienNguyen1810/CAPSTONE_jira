const globals = require('globals');

module.exports = {
	extends: [
		'plugin:react/recommended',
		'eslint:recommended',
		'plugin:jsx-a11y/recommended',
		'plugin:react/jsx-runtime',
		'plugin:prettier/recommended',
		'prettier',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', 'import', 'jsx-a11y', 'react-hooks', 'prettier'],
	rules: {
		'react/jsx-uses-react': 'error',
		'react/jsx-uses-vars': 'error',
		'react/prop-types': 'off',
		'no-explicit-any': 'off',
		'no-non-null-assertion': 'off',
		'no-unused-vars': [
			'warn',
			{
				argsIgnorePattern: '^_',
				varsIgnorePattern: '^_',
				caughtErrorsIgnorePattern: '^_',
			},
		],

		'react-hooks/rules-of-hooks': 'off',
		'react-hooks/exhaustive-deps': 'off',

		'prettier/prettier': 'off',
		'jsx-a11y/no-interactive-element-to-noninteractive-role': 'off',
		'jsx-a11y/no-noninteractive-element-interactions': 'off',
		'jsx-a11y/no-noninteractive-element-to-interactive-role': 'off',
		'jsx-a11y/no-noninteractive-tabindex': 'off',
		'jsx-a11y/no-noninteractive-element-interactions': 'off',
		'jsx-a11y/alt-text': 'off',
		'jsx-a11y/no-static-element-interactions': 'off',
		'jsx-a11y/click-events-have-key-events': 'off',

		'no-unsafe-optional-chaining': 'off',
	},
	globals: {
		...globals.browser,
	},
};
