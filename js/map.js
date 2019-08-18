'use strict';

(function() {
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var mainPinDefaultPosition = {
    x: mainPin.offsetLeft,
    y: mainPin.offsetTop
  };
  var MainPinSize = {
    WIDTH: 65,
    HEIGHT: 82
  };
  var htmlClassMapDisable = 'map--faded';

  var MapBoundary = {
    LEFT: 0,
    RIGHT: 1200,
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
      x: Math.floor(mainPin.offsetLeft + MainPinSize.WIDTH / 2),
      y: Math.floor(isMapActive() ? mainPin.offsetTop + MainPinSize.HEIGHT : mainPin.offsetTop + MainPinSize.HEIGHT / 2)
    };
  }

  function isMapActive() {
    return !map.classList.contains(htmlClassMapDisable);
  }

  function activateMap() {
    map.classList.remove(htmlClassMapDisable);
  }

  function deactivateMap() {
    setMainPinDefaultPosition();
    map.classList.add(htmlClassMapDisable);
  }

  function setMainPinDefaultPosition() {
    mainPin.style.left = (mainPinDefaultPosition.x) + 'px';
    mainPin.style.top = (mainPinDefaultPosition.y) + 'px'
  }
  
  function onMainPinMousedown(evt) {
    evt.preventDefault();
    mainPin.style.zIndex = '2';

    if (!isMapActive()) {
      if (mouseDownCallback) {
        mouseDownCallback();
      }
    }

    function validateCoords(coordinates) { /* coordinates = {x: value, y: value} */
      var result = {
        x: {
          statusLeft: coordinates.x >= MapBoundary.LEFT - MainPinSize.WIDTH / 2,
          statusRight: coordinates.x <= MapBoundary.RIGHT - MainPinSize.WIDTH / 2,
        },
        y: {
          statusTop: coordinates.y >= MapBoundary.TOP - MainPinSize.HEIGHT,
          statusBottom: coordinates.y <= MapBoundary.BOTTOM - MainPinSize.HEIGHT,
        }
      };
      result.x.status = result.x.statusLeft && result.x.statusRight;
      result.y.status = result.y.statusTop && result.y.statusBottom;
      result.status = result.x.status && result.y.status;
      return result;
    }

    function setStartCoordsPinIsOffside(axis) { /* axis = 'x' or 'y' */
      if (axis === 'x' || axis === 'y') {
        return axis === 'x' ? map.offsetLeft + mainPin.offsetLeft + MainPinSize.WIDTH / 2 : mainPin.offsetTop + MainPinSize.HEIGHT / 2 - window.pageYOffset;
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
          mainPin.style.left = (MapBoundary.RIGHT - MainPinSize.WIDTH / 2) + 'px';
          startCoords.x = setStartCoordsPinIsOffside('x');
        } else if (!isValidCoords.x.statusLeft) {
            mainPin.style.left = (MapBoundary.LEFT - MainPinSize.WIDTH / 2) + 'px';
            startCoords.x = setStartCoordsPinIsOffside('x');
          }

      if (isValidCoords.y.status) {
        startCoords.y = moveEvt.clientY;
        mainPin.style.top = newPosition.y + 'px';
      } else if (!isValidCoords.y.statusBottom) {
          mainPin.style.top = (MapBoundary.BOTTOM - MainPinSize.HEIGHT) + 'px';
          startCoords.y = setStartCoordsPinIsOffside('y');
        } else if (!isValidCoords.y.statusTop) {
            mainPin.style.top = (MapBoundary.TOP - MainPinSize.HEIGHT) + 'px';
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
    element: map,
    activate: activateMap,
    deactivate: deactivateMap,
    getMainPinCoordinates: getMainPinCoordinates,
    setMouseDownCallback: setMouseDownCallback,
    setMouseMoveCallback: setMouseMoveCallback,
    setMouseUpCallback: setMouseUpCallback,
  }
}());
