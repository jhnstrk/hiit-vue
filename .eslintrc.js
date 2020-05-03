module.exports = {
    "parser": "@typescript-eslint/parser",
    parserOptions: {
		project: './tsconfig.json'
	},
    "plugins": ["@typescript-eslint"],
    "rules": {
        '@typescript-eslint/array-type': ['warn', {default: 'generic'}],
    },
    "extends": [
        "eslint:recommended",
        'plugin:vue/vue3-recommended',
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking"
    ],
};