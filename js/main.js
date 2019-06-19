'use strict';

var map = document.querySelector('.map');
var mapWidth = map.offsetWidth;
var mapFilters = map.querySelector('.map__filters');
var pinMain = map.querySelector('.map__pin--main');
var mapPins = map.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var typesOfSentences = ['palace', 'flat', 'house', 'bungalo'];
var adForm = document.querySelector('.ad-form');
var address = adForm.querySelector('#address');
var positionLimit = {
  x: {
    min: 0,
    max: mapWidth - 50 /* Временно отнимаю 50px (ширина пина) чтобы пин не выходил за рамки карты */
  },
  y: {
    min: 130,
    max: 630
  }
};

var data = generateData(8);
var pins = createPins(data);

function getRandomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

function getRandomElement(arr) {
  return arr[getRandomInteger(0, arr.length - 1)];
}

function activateMap() {
  map.classList.remove('map--faded');
  activateForm(adForm, 'ad-form--disabled');
  activateForm(mapFilters);
}

function deactivateMap() {
  map.classList.add('map--faded');
  deactivateForm(adForm, 'ad-form--disabled');
  deactivateForm(mapFilters);
}

function activateForm(form, htmlClassDisabled) {
  var formElements = form.querySelectorAll(['input', 'select', 'fieldset']);
  for (var i = 0; i < formElements.length; i++) {
    formElements[i].removeAttribute('disabled');
  }
  if (htmlClassDisabled) {
    form.classList.remove(htmlClassDisabled);
  }
}

function deactivateForm(form, htmlClassDisabled) {
  var formElements = form.querySelectorAll(['input', 'select', 'fieldset']);
  for (var i = 0; i < formElements.length; i++) {
    formElements[i].setAttribute('disabled', 'disabled');
  }
  if (htmlClassDisabled) {
    form.classList.add(htmlClassDisabled);
  }
}

function addZeros(number, len) {
  var result = String(number);
  if (String(number).length < len) {
    for (var i = 0; i < len - String(number).length; i++) {
      result = 0 + result;
    }
  }
  return result;
}

function generateData(count) {
  var result = [];
  for (var i = 0; i < count; i++) {
    var announcement = {
      author: {
        avatar: 'img/avatars/user' + addZeros(i + 1, 2) + '.png'
      },
      offer: {
        type: getRandomElement(typesOfSentences)
      },
      location: {
        x: getRandomInteger(positionLimit.x.min, positionLimit.x.max),
        y: getRandomInteger(positionLimit.y.min, positionLimit.y.max)
      }
    };
    result.push(announcement);
  }
  return result;
}

function createPin(obj) {
  var pin = pinTemplate.cloneNode(true);
  var pinImg = pin.querySelector('img');
  pin.style.left = obj.location.x + 'px';
  pin.style.top = obj.location.y + 'px';
  pinImg.src = obj.author.avatar;
  pinImg.alt = 'заголовок объявления';
  return pin;
}

function createPins(arr) {
  var result = [];
  for (var i = 0; i < arr.length; i++) {
    result.push(createPin(arr[i]));
  }
  return result;
}

function insertPins(arr) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(arr[i]);
  }
  mapPins.appendChild(fragment);
}

function getCoordinates(elem) {
  var left = elem.offsetLeft + elem.offsetWidth / 2;
  var top = elem.offsetTop + elem.offsetHeight / 2;
  return {x: left, y: top};
}

function setAddress(x, y) {
  address.value = 'x = ' + x + ', ' + 'y = ' + y;
}

function onPinMainClick() {
  activateMap();
  insertPins(pins);
}

deactivateMap();
setAddress(getCoordinates(pinMain).x, getCoordinates(pinMain).y);

pinMain.addEventListener('click', function(evt) {
  evt.preventDefault();
  onPinMainClick()
});
