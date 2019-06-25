'use strict';

(function() {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  function renderPin(info) { /* info - объект */
    var pin = pinTemplate.cloneNode(true);
    var pinImg = pin.querySelector('img');
    pin.style.left = info.location.x + 'px';
    pin.style.top = info.location.y + 'px';
    pinImg.src = info.author.avatar;
    pinImg.alt = 'заголовок объявления';
    return pin;
  }

  function createPinElements(arrPinsInfo) {
    var pins = [];
    for (var i = 0; i < arrPinsInfo.length; i++) {
      pins.push(renderPin(arrPinsInfo[i]));
    }
    return pins;
  }

  window.createPinElements = createPinElements;
}())


