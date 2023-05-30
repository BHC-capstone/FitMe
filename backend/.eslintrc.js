module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'react-app',
    'prettier',
  ],
  plugins: ['prettier'],
  rules: {
    'react/prop-types': 'off',
    'import/np-resolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'jsx-a11y/label-has-associated-control': [
      2,
      {
        labelAttributes: ['htmlFor'],
      },
    ],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    'react/jsx-no-bind': [
      1,
      {
        allowArrowFunctions: true,
        allowFunctions: true,
        allowBind: true,
      },
    ],
  },
};