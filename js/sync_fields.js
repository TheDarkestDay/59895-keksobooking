'use strict';

(function () {
  window.syncFields = function (fieldOne, fieldTwo, fieldOneValues, fieldTwoValues, cb) {

    fieldOne.addEventListener('input', function (evt) {
      var currentValueIdx = fieldOneValues.indexOf(evt.target.value);
      var correspondingValueIdx = fieldTwoValues[currentValueIdx];
      cb(fieldTwo, correspondingValueIdx);
    });
  };
})();
