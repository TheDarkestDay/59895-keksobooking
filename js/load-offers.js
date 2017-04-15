'use strict';

(function () {
  window.loadOffers = function (url, onLoad) {
    var errorMessages = {
      400: 'Bad request',
      404: 'Not found',
      500: 'Internal server error',
      504: 'Bad gateaway'
    };

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
        return;
      }
      onLoad(null, errorMessages[xhr.status]);
    });

    xhr.addEventListener('timeout', function () {
      onLoad(null, 'Timed out');
    });

    xhr.addEventListener('error', function () {
      onLoad(null, 'Network error');
    });

    xhr.open('GET', url);
    xhr.send();
  };
})();

