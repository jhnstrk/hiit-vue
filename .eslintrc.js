module.exports = {
    "parser": "@typescript-eslint/parser",
    parserOptions: {
		project: './tsconfig.json'
	},
    "plugins": ["import", "@typescript-eslint"],
    "rules": {
        '@typescript-eslint/array-type': ['warn', {default: 'generic'}],
        "indent": ["error", 2],
    },
    "extends": [
        'plugin:vue/vue3-recommended',
        "airbnb-typescript/base"
    ],
};