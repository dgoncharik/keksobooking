'use strict';

(function() {
  var map = document.querySelector('.map');
  var pinM = map.querySelector('.map__pin--main');

  pinM.addEventListener('mousedown', function(downEvt) {
    downEvt.preventDefault();
    pinM.style.zIndex = '1000';

    var startCoords = {
      x: downEvt.clientX,
      y: downEvt.clientY
    };

    function checkLimitPosition(checkedX, checkedY) {
      var limit = {
        x: {
          min: - pinM.offsetWidth / 2,
          max: map.offsetWidth - pinM.offsetWidth / 2
        },
        y: {
          min: 130 - pinM.offsetHeight,
          max: 630 - pinM.offsetHeight
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

      var newPosition = checkLimitPosition(pinM.offsetLeft - shift.x, pinM.offsetTop - shift.y);

      pinM.style.left = newPosition.x + 'px';
      pinM.style.top = newPosition.y + 'px';
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
        x: pinM.offsetLeft + pinM.offsetWidth / 2,
        y: pinM.offsetTop + pinM.offsetHeight /* /2 */
      }
    }
  }
})()


