var MAP = document.querySelector('.map');
MAP.classList.remove('map--faded');
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
var similarAds = [];
for (var i = 1; i <= 8; i++) {
  similarAds.push(adGeneration(i))
};

function getRandomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

function getRandomElement(arr) {
  return arr[getRandomInteger(0, arr.length - 1)];
}

function adGeneration(count) {
  count = count < 10 ? '0' + count : count;
  var announcement = {
    author: {
      avatar: 'img/avatars/user' + count +'.png'
    },
    offer: {
      type: getRandomElement(typesOfSentences)
    },
    location: {
      x: getRandomInteger(POSITION_LIMIT.X.MIN, POSITION_LIMIT.X.MAX),
      y: getRandomInteger(POSITION_LIMIT.Y.MIN, POSITION_LIMIT.Y.MAX)
    }
  }
  return announcement
}

function renderPin(similar) {
  var pin = PIN_TEMPLATE.cloneNode(true);
  var pinImg = PIN.querySelector('img');
  pin.style = "left: " + similar.location.x + "px;" + "top: " + similar.location.y + "px;"
  // pin.style = "left: " + (1200 - 25) + "px;" + "top: 400px"
  pinImg.src = similar.author.avatar;
  pinImg.alt = 'заголовок объявления'
  return pin
}

function insertItems(arr, parent) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(arr[i]);
  };
  parent.appendChild(fragment);
}

insertItems('', MAP_PINS)

console.log(renderPin(similarAds[0]))
console.log(similarAds);
