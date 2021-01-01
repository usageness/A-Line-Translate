/* global chrome */
const targetUrl = "your URL";

function get_source(document_body) {
    console.log("immediate function test22");
    return document_body.innerText;
}

chrome.extension.sendMessage({
    action: "getSource",
    source: get_source(document.body)
});

function dragText() {
    console.log("mouse move");

    let text;

    if(window.getSelection) {
        text = window.getSelection().toString();
    }
    else if (document.selection) {
        text = document.selection.createRange().text;
    }
    return text;
}

document.onmouseup = function() {
    if(dragText()) {
        getTranslate(dragText());
        console.log("working");
    }
}

function displayText(translated) {
    let newDIV = document.createElement("div");
    let newP = document.createElement("p");
    let closeButton = document.createElement("span");

    closeButton.innerHTML = "X";
    closeButton.addEventListener('click', function() {
        this.parentElement.style.display = "none";
    });
    newP.innerHTML = translated;

    newDIV.appendChild(closeButton);
    newDIV.appendChild(newP);

    newDIV.setAttribute("class","translatedTextView");
    newDIV.style.padding = "1rem";
    newDIV.style.position = "fixed";
    newDIV.style.zIndex = "1";
    newDIV.style.right = "0";
    newDIV.style.top = "0";
    newDIV.style.textAlign = "right";
    newDIV.style.background = "#FFFFFF";
    newDIV.style.border = "2px solid #CEECF5";
    newDIV.style.borderRadius = "1em 0 0 1em";

    document.body.appendChild(newDIV);
}

function getTranslate(text) {
    console.log(targetUrl+text);
    let url = targetUrl + text;
    fetch(url, {mode: 'cors'})
        .then((response) => response.json())
        .then((data) => (function() {
            let translatedText = data.message.result.translatedText;
            displayText(translatedText);
        })())
        .catch((error) => console.log(error))
}