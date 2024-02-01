chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'downloadPageSource') {
    console.log('Content.js: downloadPageSource action received.');
    sendResponse({ source: document.documentElement.outerHTML });
  }
});
