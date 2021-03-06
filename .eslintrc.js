module.exports = {
  env: {
    node: true,
    browser: true,
    commonjs: true,
    es2021: true,
    jest: true,
    'cypress/globals': true,
  },
  extends: ['eslint:recommended', 'airbnb'],
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: [
    'react', 'jest', 'cypress',
  ],
  rules: {
    'react/jsx-one-expression-per-line': 'off',
    'react/prop-types': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    "prefer-destructuring": ["error", {
      "AssignmentExpression": {
        "array": false,
        "object": false
      }
    }],    
    eqeqeq: 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [
      'error', 'always',
    ],
    'arrow-spacing': [
      'error', { before: true, after: true },
    ],
    indent: [
      'error',
      2,
    ],
    'linebreak-style': [
      'error',
      'windows',
    ],
    quotes: [
      'error',
      'single',
    ],
    semi: [
      'error',
      'never',
    ],
    'no-console': 0,
  },
}
