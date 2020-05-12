module.exports = {
    "parser": "vue-eslint-parser",
    parserOptions: {
        project: './tsconfig.json',
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.vue'],
	},
    "plugins": ["import",
      "@typescript-eslint",
    ],
    "rules": {
        // '@typescript-eslint/array-type': ['warn', {default: 'generic'}],
        // "indent": ["error", 2],
        // "no-multi-spaces": "error",
    },
    "extends": [
        'plugin:vue/vue3-recommended',
        "airbnb-typescript/base"
    ],
};