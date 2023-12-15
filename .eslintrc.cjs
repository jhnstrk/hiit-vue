/* eslint-env node */
module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    project: './tsconfig-lint.json',
    parser: '@typescript-eslint/parser',
    extraFileExtensions: ['.vue'],
  },
  plugins: ['import', '@typescript-eslint'],
  rules: {
    // '@typescript-eslint/array-type': ['warn', {default: 'generic'}],
    // "indent": ["error", 2],
    // "no-multi-spaces": "error",
  },
  reportUnusedDisableDirectives: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:vue/vue3-recommended',
    'airbnb-typescript/base',
    'prettier',
  ],
};
