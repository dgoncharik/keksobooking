'use strict';

(function() {
  var map = document.querySelector('.map');
  var typesOfSentences = ['palace', 'flat', 'house', 'bungalo'];
  var positionLimit = {
    x: {
      min: 0,
      max: map.offsetWidth - window.pin.getPinSize().WIDTH
    },
    y: {
      min: 130 - window.pin.getPinSize().HEIGHT,
      max: 630 - window.pin.getPinSize().HEIGHT
    }
  };

  window.data = {
    generateData: function(count) {
      var result = [];
      for (var i = 0; i < count; i++) {
        var announcement = {
          author: {
            avatar: 'img/avatars/user' + window.utils.addZeros(i + 1, 2) + '.png'
          },
          offer: {
            type: window.utils.getRandomElement(typesOfSentences)
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
  }
})()
