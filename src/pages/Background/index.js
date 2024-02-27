console.log('This is the background page.');
console.log('Put the background scripts here.');
// // background.js

// // background.js

// // Function to log the current URL
// function logCurrentUrl() {
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     var currentUrl = tabs[0].url;
//     console.log('Current URL:', currentUrl);
//   });
// }

// // Execute logCurrentUrl function whenever the active tab changes
// chrome.tabs.onActivated.addListener(function (activeInfo) {
//   logCurrentUrl();
// });

// // Execute logCurrentUrl function when extension is installed or updated
// chrome.runtime.onInstalled.addListener(function () {
//   logCurrentUrl();
// });

// chrome.runtime.onInstalled.addListener(() =>
//   //   chrome.tabs.create({
//   //     url: 'https://www.google.com',
//   //   })
//   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//     console.log({ tabs });
//   })
// );
function triggerPopupFunction() {
  if (popupPort) {
    console.log('Triggering popup function');
    popupPort.postMessage({ message: 'openPopup' });
  } else {
    // Open the popup if it's not open
    chrome.windows.create({
      url: 'popup.html',
      type: 'popup',
      width: 300,
      height: 400,
    });
  }
}

chrome.tabs.onActivated.addListener(() => {
  console.log('chrome.tabs.onActivated');
  //   chrome.tabs.create({
  //     url: 'https://www.google.com',
  //   })
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    console.log({ tabs });
    console.log({ chrome: chrome });
    triggerPopupFunction();
    // const activeTab = tabs;
    // const tabUrl = activeTab.url;

    // console.log({ tabUrl });

    // chrome.tabs.sendMessage(activeTab.id, { url: tabUrl });
  });
});
// background.js

let popupPort;

chrome.runtime.onConnect.addListener((port) => {
  if (port.name === 'popup') {
    popupPort = port;
    popupPort.postMessage({ message: 'Connected from background' });
  }
});

// Example: Trigger popup function

// Example: Execute the function when a certain event occurs
