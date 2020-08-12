import React, { Fragment } from 'react';
// import logo from './logo.svg';
import './App.css';

function App() {
  console.log("window.__CHROME_WEB_BROWSER_ADAPTER__: ", window.__CHROME_WEB_BROWSER_ADAPTER__);

  if(window.__CHROME_WEB_BROWSER_ADAPTER__) {
    const { activeBrowserTabUrl, extensionWindowId } = window.__CHROME_WEB_BROWSER_ADAPTER__;
    return (
      <Fragment>
        <h1>Hello, World! CHROME SWITCHER</h1>
        <p>{`I am Chrome Extension Adapter: ${extensionWindowId}.`}</p>
        <p>{`The current browser context is: ${activeBrowserTabUrl}.`}</p>
      </Fragment>
    );
  } else {
    return null;
  };
}

export default App;
