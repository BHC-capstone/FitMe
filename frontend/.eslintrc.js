module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb',
    // {"prettier/react",}
    'eslint:recommended',
    'plugin:prettier/recommended',
    'react-app',
    'prettier',
  ],
  plugins: ['prettier'],
  rules: {
    'import/np-resolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'jsx-a11y/label-has-associated-control': [
      2,
      {
        labelAttributes: ['htmlFor'],
      },
    ],
    'prettier/prettier': 'error',
  },
};
