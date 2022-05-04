module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'no-shadow': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/no-shadow': ['error'],
    'react-native/no-inline-styles': 'off',
  },
};
