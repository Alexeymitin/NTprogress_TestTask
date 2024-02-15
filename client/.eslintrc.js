module.exports = {
	env: {
		browser: true,
		es2021: true,
		jest: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
	],
	settings: {
		react: {
			version: 'detect',
		},
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint', 'react-hooks'],
	rules: {
		'react/jsx-indent': ['error', 'tab'],
		'react/jsx-indent-props': ['error', 'tab'],
		indent: ['error', 'tab'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'react/jsx-filename-extension': [
			1,
			{
				extensions: ['.js', '.jsx', '.tsx'],
			},
		],
		'import/no-unresolved': 'off',
		'import/prefer-default-export': 'off',
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{ argsIgnorePattern: '^_' },
		],
		'react/react-in-jsx-scope': 'off',
		'react/require-default-props': 'off',
		'react/button-has-type': 1,
		'react/jsx-props-no-spreading': 'off',
		'react/function-component-definition': 'off',
		'no-shadow': 'off',
		'no-undef': 'off',
		'import/extensions': 'off',
		'max-len': [
			'error',
			{
				ignoreComments: true,
				code: 130,
			},
		],
		'jsx-a11y/no-static-element-interactions': 'off',
		'jsx-a11y/click-events-have-key-events': 'off',
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'error',
		'no-param-reassign': 'off',
		'react/display-name': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
	},
	// globals: {
	// 	__IS_DEV__: true,
	// 	__API__: true,
	// 	__PROJECT__: true,
	// 	module: true,
	// },
	overrides: [
		{
			files: ['**/src/**/*.{test,stories}.{ts,tsx}'],
			rules: {
				'max-len': 'off',
			},
		},
	],
};

// import './config/jest/setupTests'
