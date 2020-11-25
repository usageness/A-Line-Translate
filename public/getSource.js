/* global chrome */

console.log("immediate function test");

function get_source(document_body) {
    return document_body.innerText;
}

chrome.extension.sendMessage({
    action: "getSource",
    source: get_source(document.body)
});