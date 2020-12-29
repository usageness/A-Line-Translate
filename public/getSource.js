/* global chrome */

console.log("immediate function test");

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
        text = window.selection.createRange().text;
    }
    return text;
}

document.onmouseup = function() {
    if(dragText()) {
        alert(dragText());
        console.log("working");
    }
}