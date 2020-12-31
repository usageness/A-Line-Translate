/* global chrome */
console.log("immediate function test");

const targetUrl = "http://alinetranslate.cafe24app.com/translate?sourceText=";

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
    newDIV.appendChild(newP);

    newP.innerHTML = translated;
    newDIV.setAttribute("id","textView");
    newDIV.style.padding = "1rem";
    newDIV.style.position = "fixed";
    newDIV.style.zIndex = "1";
    newDIV.style.right = "0";
    newDIV.style.top = "0";

    let body = document.getElementsByClassName("body");
    body.appendChild(newDIV);
}

function getTranslate(text) {
    console.log(targetUrl+text);
    let url = targetUrl + text;
    fetch(url, {mode: 'cors'})
        .then((response) => response.json())
        .then((data) => (function() {
            alert(data.message.result.translatedText);
            console.log(data.message.result.translatedText);
        })())
        .catch((error) => console.log(error))
}