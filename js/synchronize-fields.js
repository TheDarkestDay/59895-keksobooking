'use strict';

(function () {
  window.syncFields = function (mainField, dependantField, fieldOneValues, fieldTwoValues, cb) {

    mainField.addEventListener('input', function (evt) {
      var currentValueIdx = fieldOneValues.indexOf(evt.target.value);
      var correspondingValueIdx = fieldTwoValues[currentValueIdx];
      cb(dependantField, correspondingValueIdx);
    });
  };
})();
