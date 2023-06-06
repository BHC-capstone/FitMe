module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  plugins: ['prettier', 'jest'],
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

    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',

    'no-shadow': 'off',
    'consistent-return': 'off',
    'prefer-const': 'off',
    'no-empty-pattern': 'off',
    'no-empty': 'off',
    'no-uselss-escape': 'off',
    strict: 'off',
    'no-path-concat': 'off',
    'no-useless-concat': 'off',
    'no-path-concat': 'off',
    'no-dupe-keys': 'off',
    'import/no-dynamic-require': 'off',
    'global-require': 'off',
    'import/no-unresolved': 'off',
    'no-underscore-dangle': 'off',
    'no-var': 'off',
    'import/newline-after-import': 'off',
    'no-unused-vars': 'off',
    'import/order': 'off',
    'prefer-destructuring': 'off',
    'no-unused-expressions': 'off',
    'func-names': 'off',
    'no-console': 'off',
    eqeqeq: 'off',
    'no-undef': 'off',
    'prefer-template': 'off',
    'object-shorthand': 'off',
    'spaced-comment': 'off',

    camelcase: 'off',
  },
};
