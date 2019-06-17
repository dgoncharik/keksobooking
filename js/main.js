'use strict';

var map = document.querySelector('.map');
var mapWidth = map.offsetWidth;
var mapFilters = map.querySelector('.map__filters');
var pinMain = map.querySelector('.map__pin--main');
var mapPins = map.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var typesOfSentences = ['palace', 'flat', 'house', 'bungalo'];
var adForm = document.querySelector('.ad-form');
var positionLimit = {
  X: {
    MIN: 0,
    MAX: mapWidth - 50 /* Временно отнимаю 50px (ширина пина) чтобы пин не выходил за рамки карты */
  },
  Y: {
    MIN: 130,
    MAX: 630
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
}

function deactivateMap() {
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var mapFiltersFieldsets = mapFilters.querySelectorAll('fieldset');
  var mapFiltersSelects = mapFilters.querySelectorAll('select');
  map.classList.add('map--faded');
  adForm.classList.add('ad-form--disabled');
  for (var i=0; i<adFormFieldsets.length; i++) {
    adFormFieldsets[i].setAttribute('disabled', 'disabled');
  }
  for (var i=0; i<mapFiltersFieldsets.length; i++) {
    mapFiltersFieldsets[i].setAttribute('disabled', 'disabled');
  }
  for (var i=0; i<mapFiltersSelects.length; i++) {
    mapFiltersSelects[i].setAttribute('disabled', 'disabled');
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
        x: getRandomInteger(positionLimit.X.MIN, positionLimit.X.MAX),
        y: getRandomInteger(positionLimit.Y.MIN, positionLimit.Y.MAX)
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

deactivateMap();

pinMain.addEventListener('click', function(evt) {
  evt.preventDefault();
  activateMap();
  insertPins(pins);
})