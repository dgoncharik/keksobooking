'use strict';

(function() {
  window.utils = {
    getRandomInteger: function(min, max) {
      var rand = min - 0.5 + Math.random() * (max - min + 1);
      return Math.round(rand);
    },

    getRandomElement: function(arr) {
      return arr[window.utils.getRandomInteger(0, arr.length - 1)];
    },

    addZeros: function(number, len) {
      var result = String(number);
      if (String(number).length < len) {
        for (var i = 0; i < len - String(number).length; i++) {
          result = 0 + result;
        }
      }
      return result;
    }
  }
})()
