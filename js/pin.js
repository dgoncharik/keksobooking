'use strict';

(function() {
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  function renderPin(obj) {
    var pin = pinTemplate.cloneNode(true);
    var pinImg = pin.querySelector('img');
    pin.style.left = obj.location.x + 'px';
    pin.style.top = obj.location.y + 'px';
    pinImg.src = obj.author.avatar;
    pinImg.alt = 'заголовок объявления';
    return pin;
  }

  window.pin = {
    getPinSize: function() {
      return {
        WIDTH: PIN_WIDTH,
        HEIGHT: PIN_HEIGHT
      }
    },

    renderPins: function(arr) {
      var result = [];
      for (var i = 0; i < arr.length; i++) {
        result.push(renderPin(arr[i]));
      }
      return result;
    },

    displayPinsToMap: function(arr) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < arr.length; i++) {
        fragment.appendChild(arr[i]);
      }
      mapPins.appendChild(fragment);
    }
  }
})()


