'use strict';

window.errorMessage = (function () {
  var SHOW_DURATION = 2 * 1000;

  var messageElement = document.querySelector('.error-message');
  var messageText = messageElement.querySelector('.error-message__text');

  function hide() {
    messageText.textContent = '';
    messageElement.classList.remove('error-message--opened');
  }

  return {
    display: function (message) {
      messageText.textContent = message;
      messageElement.classList.add('error-message--opened');
      setTimeout(hide, SHOW_DURATION);
    }
  };
})();
