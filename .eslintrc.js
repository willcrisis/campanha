// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
    'prefer-const': 'error',
    'arrow-body-style': ['error', 'as-needed'],
  },
  ignorePatterns: ['/dist/*'],
};
