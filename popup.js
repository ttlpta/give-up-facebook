document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('checkPage');
    console.log(window.location.href);
    checkPageButton.addEventListener('click', function() {
      chrome.tabs.executeScript(null,
        {code:"alert('aaaa')"});
      window.close();
    }, false);
  }, false);