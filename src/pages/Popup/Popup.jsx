import React, { useEffect } from 'react';
import logo from '../../assets/img/logo.svg';
import './Popup.css';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'triggerPopup') {
    triggerPopupFunction();
  }
});

const Popup = () => {
  console.log('Popup');
  // Define the message listener inside a useEffect hook
  useEffect(() => {
    console.log('Popup useEffect');
    // Message listener
    const messageListener = (message) => {
      // Check if the message contains the URL
      if (message.url) {
        // Handle the received URL
        console.log("Received URL in popup script:", message.url);
        // You can further process the received URL here
      }
    };

    // Add message listener
    chrome.runtime.onMessage.addListener(messageListener);

    // Clean up: remove message listener when component unmounts
    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/pages/Popup/Popup.jsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          hi Vinu!
        </a>
      </header>
    </div>
  );
};

export default Popup;

