'use strict';

(function() {
  var map = document.querySelector('.map');
  var pinElement = map.querySelector('.map__pin--main');
  var MAIN_PIN_WIDTH = pinElement.offsetWidth;
  var MAIN_PIN_HEIGHT = pinElement.offsetHeight;

  pinElement.addEventListener('mousedown', function(downEvt) {
    downEvt.preventDefault();
    pinElement.style.zIndex = '1000';

    var startCoords = {
      x: downEvt.clientX,
      y: downEvt.clientY
    };

    function checkLimitPosition(checkedX, checkedY) {
      var limit = {
        x: {
          min: window.map.getMapBoundares().LEFT - MAIN_PIN_WIDTH / 2,
          max: window.map.getMapBoundares().RIGHT - MAIN_PIN_WIDTH / 2
        },
        y: {
          min: window.map.getMapBoundares().TOP - MAIN_PIN_HEIGHT,
          max: window.map.getMapBoundares().BOTTOM - MAIN_PIN_HEIGHT
        }
      };
      checkedX = checkedX <= limit.x.min ? limit.x.min : checkedX;
      checkedY = checkedY <= limit.y.min ? limit.y.min : checkedY;
      checkedX = checkedX >= limit.x.max ? limit.x.max : checkedX;
      checkedY = checkedY >= limit.y.max ? limit.y.max : checkedY;

      return {x: checkedX, y: checkedY};
    }

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var newPosition = checkLimitPosition(pinElement.offsetLeft - shift.x, pinElement.offsetTop - shift.y);

      pinElement.style.left = newPosition.x + 'px';
      pinElement.style.top = newPosition.y + 'px';
      window.form.setAddress(window.mainPin.getCoordinates().x, window.mainPin.getCoordinates().y);
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      if (!window.map.activated) {
        window.map.activateMap();
      }
      window.form.setAddress(window.mainPin.getCoordinates().x, window.mainPin.getCoordinates().y);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  })

  window.mainPin = {
    getCoordinates: function() {
      return {
        x: pinElement.offsetLeft + pinElement.offsetWidth / 2,
        y: pinElement.offsetTop + pinElement.offsetHeight /* /2 */
      }
    }
  }
})()


