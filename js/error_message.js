'use strict';

window.errorMessage = (function () {
  var SHOW_DURATION = 2000;

  var messageElement = document.querySelector('.error-message');

  return {
    display: function (message) {
      messageElement.classList.add('error-message--opened');
      messageElement.querySelector('.error-message__text').textContent = message;
      setTimeout(function () {
        messageElement.classList.remove('error-message--opened');
      }, SHOW_DURATION);
    }
  };
})();
