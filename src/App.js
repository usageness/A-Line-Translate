/* global chrome */
import './App.css';

function App() {
  __onWindowLoad();
  return (
    <div className="App">
      <header className="App-header">
        <p><strong>한 줄 번역기 (A Line Translate)</strong></p>
        <p>텍스트를 드래그해보세요!</p>
        <a
          className="App-link"
          href="https://github.com/usageness/A-Line-Translate"
          target="_blank"
          rel="noopener noreferrer"
        >
          github
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
