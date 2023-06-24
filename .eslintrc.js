module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
      'plugin:@typescript-eslint/recommended',
      'prettier',
      'plugin:prettier/recommended',
      'plugin:@next/next/recommended'
    ],
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    rules: {
      'no-unused-vars': 'off',
      "@typescript-eslint/no-explicit-any": "off",
      '@typescript-eslint/no-unused-vars': ['error'],
    },
  }