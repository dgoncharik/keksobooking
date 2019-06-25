'use strict';

(function() {
  function getRandomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }

  function getRandomElement(arr) {
    return arr[window.utils.getRandomInteger(0, arr.length - 1)];
  }

  function addZeros(number, len) {
    var result = String(number);
    if (String(number).length < len) {
      for (var i = 0; i < len - String(number).length; i++) {
        result = 0 + result;
      }
    }
    return result;
  }

  window.utils = {
    getRandomInteger: getRandomInteger,
    getRandomElement: getRandomElement,
    addZeros: addZeros
  }
}())
