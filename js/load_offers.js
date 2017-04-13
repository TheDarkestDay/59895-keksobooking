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
    var response = {};
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      response.success = false;
      response.data = xhr.status + ' : ' + errorMessages[xhr.status];
      if (xhr.status === 200) {
        response.success = true;
        response.data = xhr.response;
      }
      onLoad(response);
    });

    xhr.addEventListener('timeout', function () {
      response.success = false;
      response.data = 'Timeout';
      onLoad(response);
    });

    xhr.addEventListener('error', function () {
      response.success = false;
      response.data = 'Connection error';
      onLoad(response);
    });

    xhr.open('GET', url);
    xhr.send();
  };
})();

