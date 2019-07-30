'use strict';

(function() {
  var map = document.querySelector('.map');
  var housingTypes = ['palace', 'flat', 'house', 'bungalo'];
  var PinSize = {
    WIDTH: 50,
    HEIGHT: 70
  }
  var PositionLimit = {
    X: {
      MIN: 0,
      MAX: map.offsetWidth - PinSize.WIDTH
    },
    Y: {
      MIN: 130 - PinSize.HEIGHT,
      MAX: 630 - PinSize.HEIGHT
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
          x: window.utils.getRandomInteger(PositionLimit.X.MIN, PositionLimit.X.MAX),
          y: window.utils.getRandomInteger(PositionLimit.Y.MIN, PositionLimit.Y.MAX)
        }
      };
      result.push(announcement);
    }
    return result;
  }

  window.generateData = generateData;
}())
