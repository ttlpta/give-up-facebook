chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    var currentDate = new Date();
    var hour = currentDate.getHours();
    var min = currentDate.getMinutes();
    var second = currentDate.getSeconds();
    var currentTime = hour + ':' + min + ':' + second;
    var start = '21:00:00';
    var end = '24:00:00';

    return {cancel: start < currentTime && currentTime < end && details.url.indexOf("bongda") != -1};
  },
  {urls: ["<all_urls>"]},
  ["blocking"]);

// chrome.browserAction.onClicked.addListener(function(tab) {
//     chrome.tabs.executeScript({
//       code: 'document.body.style.backgroundColor="red"'
//     });
//   });