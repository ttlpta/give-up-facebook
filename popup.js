document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('checkPage');
    checkPageButton.addEventListener('click', function() {
      alert('aaa');
      window.location.href = 'https://google.com.vn';
    }, false);
  }, false);