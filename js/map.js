'use strict';

(function() {
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var pinContainer = document.querySelector('.map__pins');
  var MAIN_PIN_WIDTH = mainPin.offsetWidth;
  var MAIN_PIN_HEIGHT = mainPin.offsetHeight;
  var filter = map.querySelector('.map__filters'); /* Написать функции включения/отключения фильтра */
  var filterElements = filter.querySelectorAll(['select', 'fieldset']);
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

  function getMainPinCoordinates() { /* Переписать возврат координат в зависимости от активности страницы (либо возвращается координата центра, либо низа пина) */
    return {
      x: mainPin.offsetLeft + mainPin.offsetWidth / 2,
      y: mainPin.offsetTop + mainPin.offsetHeight /* /2 */
    }
  }

  function isMapActive() {
    return !map.classList.contains(htmlClassMapDisable)
  }

  function activateMap() {
    map.classList.remove(htmlClassMapDisable);
  }

  function deactivateMap() {
    // window.map.activated = false;
    map.classList.add(htmlClassMapDisable);
    // window.form.deactivateForm(adForm, 'ad-form--disabled');
    // window.form.deactivateForm(filter);
  }

  function enableFilter() {
    for (var i = 0; i < filterElements.length; i++) {
      filterElements[i].removeAttribute('disabled');
    }
  }

  function disableFilter() {
    for (var i = 0; i < filterElements.length; i++) {
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

  function onMainPinMousedown(evt) {
    evt.preventDefault();
    // mainPin.style.zIndex = '1000';
    if (!isMapActive()) { /* Если карта не активна */
      if (mouseDownCallback) {
        mouseDownCallback();
      }
    }

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function checkLimitPosition(checkedX, checkedY) {
      var limit = {
        x: {
          min: MAP_BOUNDARIES.LEFT - MAIN_PIN_WIDTH / 2,
          max: MAP_BOUNDARIES.RIGHT - MAIN_PIN_WIDTH / 2
        },
        y: {
          min: MAP_BOUNDARIES.TOP - MAIN_PIN_HEIGHT,
          max: MAP_BOUNDARIES.BOTTOM - MAIN_PIN_HEIGHT
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

      var newPosition = checkLimitPosition(mainPin.offsetLeft - shift.x, mainPin.offsetTop - shift.y);

      mainPin.style.left = newPosition.x + 'px';
      mainPin.style.top = newPosition.y + 'px';
      // window.form.setAddress(window.mainPin.getCoordinates().x, window.mainPin.getCoordinates().y);
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      activateMap();
      // window.form.setAddress(window.mainPin.getCoordinates().x, window.mainPin.getCoordinates().y);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
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
    enableFilter: enableFilter,
    disableFilter: disableFilter,
    setMouseDownCallback: setMouseDownCallback
  }
}());
