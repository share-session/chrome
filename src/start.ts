const s = document.createElement('script');

s.src = chrome.runtime.getURL('content.js');
s.onload = function () {
  (this as any).remove();
};

(document.head || document.documentElement).appendChild(s);
