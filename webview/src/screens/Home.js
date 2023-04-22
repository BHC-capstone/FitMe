import React from 'react';
import WebView from 'react-native-webview';

const Home = () => {
  return <WebView source={{uri: 'https://naver.com'}} />;
};

export default Home;
