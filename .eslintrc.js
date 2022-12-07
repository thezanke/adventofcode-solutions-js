module.exports = {
  env: {
    browser: true,
    es2022: true
  },
  extends: 'standard-with-typescript',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json']
  },
  rules: {
    // '@typescript-eslint/explicit-function-return-type': 'off',
    // '@typescript-eslint/semi': ['error', 'always'],
    // '@typescript-eslint/no-extra-semi': 'error',
    // '@typescript-eslint/space-before-function-paren': ['error', 'never'],
    // semi: ['error', 'always']
  },
  ignorePatterns: ['archived']
}
