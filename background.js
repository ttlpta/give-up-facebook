var start;
var end;
chrome.webRequest.onBeforeSendHeaders.addListener(
  function(details) {
    const store = new Store('give-up-fb');
    store.findAll().then(function(timeRange){
      console.log(timeRange);
      start = timeRange.startTime;
      end = timeRange.endTime;
    });
    return {cancel: false};
  },
  {urls: ["<all_urls>"]},
  ["blocking"]);

chrome.webRequest.onBeforeSendHeaders.addListener(
  function(details) {
    const currentDate = new Date();
    const hour1 = currentDate.getHours();
    const hour = hour1 < 10 ? hour1 + '0' : hour1;
    const min1 = currentDate.getMinutes();
    const min = min1 < 10 ? min1 + '0' : min1;
    const second1 = currentDate.getSeconds();
    const second = second1 < 10 ? second1 + '0' : second1;
    const currentTime = hour + ':' + min + ':' + second;
    return {cancel: start < currentTime && currentTime < end && details.url.indexOf('://www.facebook.com') != -1 };
  },
  {urls: ["<all_urls>"]},
  ["blocking"]);
