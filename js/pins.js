'use strict';

(function() {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinContainer = document.querySelector('.map__pins');
  var PinSize = {
    WIDTH: 50,
    HEIGHT: 70
  }

  function renderPinElement(info, onPinClick) { /* info - объект */
    var pin = pinTemplate.cloneNode(true);
    var pinImg = pin.querySelector('img');
    pin.style.left = info.location.x + 'px'; /* ? (info.location.x - PinSize.WIDTH / 2) + 'px'; */
    pin.style.top = info.location.y + 'px';  /* ? (info.location.y - PinSize.HEIGHT) + 'px'; */
    pinImg.src = info.author.avatar;
    pinImg.alt = info.offer.title;
    pin.addEventListener('click', function(evt) {
      if(onPinClick) {
        onPinClick(evt, info);
      }
    })
    return pin;
  }

  function renderPinElements(arrPinsInfo, onPinClick) {
    var pins = [];
    arrPinsInfo.forEach(info => {
      pins.push(renderPinElement(info, onPinClick));
    });
    return pins;
  }

  function insertPinsInDom(arrPinElements, count) {
    var fragment = document.createDocumentFragment();
    arrPinElements.slice(0, count).forEach(pin => {
      fragment.appendChild(pin);
    });
    pinContainer.appendChild(fragment);
  }

  function removePinsFromDom() {
    var pins = Array.from(document.querySelectorAll('.map__pin:not(.map__pin--main'));
    pins.forEach(pin => {
      pin.remove();
    });
  }

  window.pins = {
    renderElements: renderPinElements,
    insertInDom: insertPinsInDom,
    removeAllFromDom: removePinsFromDom,
  }
}())
