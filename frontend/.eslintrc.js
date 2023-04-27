module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb',
    'plugin:prettier/recommended',
    'eslint-plugin-react',
  ],
  rules: {
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
  },
  // 위처럼 플러그인 이름 + / + rule 이름을 키로 하고 뒤는 공식문서에 나온 설명대로 원하는 규칙으로 설정해줍니다.
};
