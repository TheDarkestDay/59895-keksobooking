'use strict';

window.utils = (function () {

  return {
    forEach: function (array, cb) {
      Array.prototype.forEach.call(array, cb);
    },
    getRandomInRange: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getRandomElement: function (arr) {
      var idx = Math.floor(Math.random() * arr.length);
      return arr[idx];
    },
    getRandomSubarray: function (arr) {
      var randomLength = this.getRandomInRange(0, arr.length);
      var arrCopy = arr.slice();
      var result = [];

      for (var i = 0; i < randomLength; i++) {
        var idx = this.getRandomInRange(0, arrCopy.length - 1);
        result.push(arrCopy[idx]);
        arrCopy.splice(idx, 1);
      }

      return result;
    }
  };

})();
