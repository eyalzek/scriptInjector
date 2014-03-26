// chrome.runtime.sendMessage('injectScript');
var s = document.createElement('script');
s.src = chrome.extension.getURL('app/js/script.js');
(document.head||document.documentElement).appendChild(s);
s.onload = function() {
    s.parentNode.removeChild(s);
};