import React from "react";
import WebView from "react-native-webview";

const Home = () => {
    return <WebView source={{ uri: "https://fitme.p-e.kr:4000" }} />;
};

export default Home;
