'use strict';

(function() {
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var pinContainer = document.querySelector('.map__pins');
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 82;
  var filter = map.querySelector('.map__filters');
  var filterElements = filter.querySelectorAll(['select', 'fieldset', 'label']);
  var htmlClassMapDisable = 'map--faded';

  var MAP_BOUNDARIES = {
    LEFT: 0,
    RIGHT: map.offsetWidth,
    TOP: 130,
    BOTTOM: 630
  };

  var mouseDownCallback = null;
  var mouseMoveCallback = null;
  var mouseUpCallback = null;

  function setMouseDownCallback(fn) {
    mouseDownCallback = fn;
  }

  function setMouseMoveCallback(fn) {
    mouseMoveCallback = fn;
  }

  function setMouseUpCallback(fn) {
    mouseUpCallback = fn;
  }

  function getMainPinCoordinates() {
    return {
      x: Math.floor(mainPin.offsetLeft + MAIN_PIN_WIDTH / 2),
      y: Math.floor(isMapActive() ? mainPin.offsetTop + MAIN_PIN_HEIGHT : mainPin.offsetTop + MAIN_PIN_HEIGHT / 2)
    };
  }

  function isMapActive() {
    return !map.classList.contains(htmlClassMapDisable);
  }

  function activateMap() {
    map.classList.remove(htmlClassMapDisable);
    enableFilter();
  }

  function deactivateMap() {
    map.classList.add(htmlClassMapDisable);
    removePins();
    disableFilter();
  }

  function enableFilter() {
    for (var i = 0; i < filterElements.length; i++) {
      filterElements[i].style.cursor = '';
      filterElements[i].removeAttribute('disabled');
    }
  }

  function disableFilter() {
    for (var i = 0; i < filterElements.length; i++) {
      filterElements[i].style.cursor = 'default';
      filterElements[i].disabled = true;
    }
  }

  function addPins(arrPinElements) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arrPinElements.length; i++) {
      fragment.appendChild(arrPinElements[i]);
    }
    pinContainer.appendChild(fragment);
  }

  function removePins() {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main');
    pins.forEach(pin => {
      pin.remove();
    });
  }

  function onMainPinMousedown(evt) {
    evt.preventDefault();
    mainPin.style.zIndex = '1000';

    if (!isMapActive()) { /* Если карта не активна */
      if (mouseDownCallback) {
        mouseDownCallback();
      }
    }

    function validateCoords(coordinates) { /* coordinates = {x: value, y: value} */
      var result = {
        x: {
          statusLeft: coordinates.x >= MAP_BOUNDARIES.LEFT - MAIN_PIN_WIDTH / 2,
          statusRight: coordinates.x <= MAP_BOUNDARIES.RIGHT - MAIN_PIN_WIDTH / 2,
        },
        y: {
          statusTop: coordinates.y >= MAP_BOUNDARIES.TOP - MAIN_PIN_HEIGHT,
          statusBottom: coordinates.y <= MAP_BOUNDARIES.BOTTOM - MAIN_PIN_HEIGHT,
        }
      };
      result.x.status = result.x.statusLeft && result.x.statusRight;
      result.y.status = result.y.statusTop && result.y.statusBottom;
      result.status = result.x.status && result.y.status;
      return result;
    }

    function setStartCoordsPinIsOffside(axis) { /* axis = 'x' or 'y' */
      if (axis === 'x' || axis === 'y') {
        return axis === 'x' ? map.offsetLeft + mainPin.offsetLeft + MAIN_PIN_WIDTH / 2 : mainPin.offsetTop + MAIN_PIN_HEIGHT / 2 - window.pageYOffset;
      }
      throw new Error('setStartCoordsPinIsOffside takes one string parameter "x" or "y". Unmatched parameter - ' + axis + ', type - ' + typeof(axis));
    }

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      var newPosition = {
        x: mainPin.offsetLeft - (startCoords.x - moveEvt.clientX),
        y: mainPin.offsetTop - (startCoords.y - moveEvt.clientY)
      }

      var isValidCoords = validateCoords(newPosition);

      if (isValidCoords.x.status) {
        mainPin.style.left = newPosition.x + 'px';
        startCoords.x = moveEvt.clientX;
      } else if (!isValidCoords.x.statusRight) {
          mainPin.style.left = (MAP_BOUNDARIES.RIGHT - MAIN_PIN_WIDTH / 2) + 'px';
          startCoords.x = setStartCoordsPinIsOffside('x');
        } else if (!isValidCoords.x.statusLeft) {
            mainPin.style.left = (MAP_BOUNDARIES.LEFT - MAIN_PIN_WIDTH / 2) + 'px';
            startCoords.x = setStartCoordsPinIsOffside('x');
          }

      if (isValidCoords.y.status) {
        startCoords.y = moveEvt.clientY;
        mainPin.style.top = newPosition.y + 'px';
      } else if (!isValidCoords.y.statusBottom) {
          mainPin.style.top = (MAP_BOUNDARIES.BOTTOM - MAIN_PIN_HEIGHT) + 'px';
          startCoords.y = setStartCoordsPinIsOffside('y');
        } else if (!isValidCoords.y.statusTop) {
            mainPin.style.top = (MAP_BOUNDARIES.TOP - MAIN_PIN_HEIGHT) + 'px';
            startCoords.y = setStartCoordsPinIsOffside('y');
          }

      if (mouseMoveCallback) {
        mouseMoveCallback();
      }
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      mainPin.style.zIndex = '';
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      if (mouseUpCallback) {
        mouseUpCallback();
      }
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  mainPin.addEventListener('mousedown', onMainPinMousedown)

  window.map = {
    activate: activateMap,
    deactivate: deactivateMap,
    getMainPinCoordinates: getMainPinCoordinates,
    addPins: addPins,
    setMouseDownCallback: setMouseDownCallback,
    setMouseMoveCallback: setMouseMoveCallback,
    setMouseUpCallback: setMouseUpCallback,
  }
}());
