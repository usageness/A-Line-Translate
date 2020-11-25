/* global chrome */

import logo from './logo.svg';
import './App.css';

function App() {
  __onWindowLoad();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React?
        </a>
      </header>
    </div>
  );
}
function __onWindowLoad() {
  chrome.extension.onMessage.addListener(function(request, sender) {
    if(request.action == "getSource") {
      document.body.innerText = request.source;
    }
  });

  function onWindowLoad() {
    chrome.tabs.executeScript(null, {
      file: "getSource.js"
      }, function() {
      if(chrome.extension.lastError) {
        document.body.innerText = 'Error : \n' + chrome.extension.lastError.message;
      }
    });
  }

  window.onload = onWindowLoad;
}

export default App;
