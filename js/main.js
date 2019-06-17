'use strict';

var MAP = document.querySelector('.map');
var MAP_WIDTH = MAP.offsetWidth;
var MAP_PINS = MAP.querySelector('.map__pins');
var PIN_TEMPLATE = document.querySelector('#pin').content.querySelector('.map__pin');
var typesOfSentences = ['palace', 'flat', 'house', 'bungalo'];
var POSITION_LIMIT = {
  X: {
    MIN: 0,
    MAX: MAP_WIDTH
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
  MAP.classList.remove('map--faded');
}

function deactivateMap() {
  MAP.classList.add('map--faded');
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
        x: getRandomInteger(POSITION_LIMIT.X.MIN, POSITION_LIMIT.X.MAX),
        y: getRandomInteger(POSITION_LIMIT.Y.MIN, POSITION_LIMIT.Y.MAX)
      }
    };
    result.push(announcement);
  }
  return result;
}

function createPin(obj) {
  var pin = PIN_TEMPLATE.cloneNode(true);
  var pinImg = pin.querySelector('img');
  pin.style.left = obj.location.x + 'px';
  pin.style.top = obj.location.y + 'px';
  // pin.style = "left: " + (1200 - 50) + "px;" + "top: 400px";
  pinImg.src = obj.author.avatar;
  pinImg.alt = 'заголовок объявления';
  return pin;
}

function insertPins(arr) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(arr[i]);
  }
  MAP_PINS.appendChild(fragment);
}

function createPins(arr) {
  var result = [];
  for (var i = 0; i < arr.length; i++) {
    result.push(createPin(arr[i]));
  }
  return result;
}

activateMap();
insertPins(pins);
