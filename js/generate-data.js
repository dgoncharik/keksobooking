'use strict';

(function() {
  var map = document.querySelector('.map');
  var housingTypes = ['palace', 'flat', 'house', 'bungalo'];
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var positionLimit = {
    x: {
      min: 0,
      max: map.offsetWidth - PIN_WIDTH
    },
    y: {
      min: 130 - PIN_HEIGHT,
      max: 630 - PIN_HEIGHT
    }
  };

  function generateData(count) {
    var result = [];
    for (var i = 0; i < count; i++) {
      var announcement = {
        author: {
          avatar: 'img/avatars/user' + window.utils.addZeros(i + 1, 2) + '.png'
        },
        offer: {
          type: window.utils.getRandomElement(housingTypes)
        },
        location: {
          x: window.utils.getRandomInteger(positionLimit.x.min, positionLimit.x.max),
          y: window.utils.getRandomInteger(positionLimit.y.min, positionLimit.y.max)
        }
      };
      result.push(announcement);
    }
    return result;
  }

  window.generateData = generateData;
}())
