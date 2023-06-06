import React from "react";
import WebView from "react-native-webview";

const Home = () => {
    return <WebView source={{ uri: "https://localhost:4000" }} />;
};

export default Home;
