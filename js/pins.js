'use strict';

(function() {
  var map = document.querySelector('.map');
  var filtersContainer = map.querySelector('.map__filters-container');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var TYPE_OF_HOUSING = {
    bungalo: 'Бунгало',
    flat: 'Квартира',
    house: 'Дом',
    palace: 'Дворец'
  };

  var FEATURES = { /* html классы функций */
      wifi: 'popup__feature--wifi',
      dishwasher: 'popup__feature--dishwasher',
      parking: 'popup__feature--parking',
      washer: 'popup__feature--washer',
      elevator: 'popup__feature--elevator',
      conditioner: 'popup__feature--conditioner'
  };

  function renderFeatureElement(typeFeature) {
    var feature = document.createElement('li');
    feature.classList.add('popup__feature');
    feature.classList.add(FEATURES[typeFeature]);
    return feature;
  }

  function insertFeaturesElements(cardElement, arrTypesFeatures) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arrTypesFeatures.length; i++) {
      var currentFeature = renderFeatureElement(arrTypesFeatures[i]);
      fragment.appendChild(currentFeature);
    }
    cardElement.querySelector('.popup__features').appendChild(fragment);
  }

  function removeFeaturesElements(cardElement) {
    var features = cardElement.querySelectorAll('.popup__feature');
    features.forEach(feature => {
      feature.remove()
    });
  }

  function renderPhoto(url) {
    var photo = document.createElement('img');
    photo.src = url;
    photo.classList.add('popup__photo');
    photo.width = 45;
    photo.height = 40;
    photo.alt = 'Фотография жилья';
    return photo;
  }

  function insertPhotos(cardElement, arrUrl) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arrUrl.length; i++) {
      var currentUrl = arrUrl[i];
      fragment.appendChild(renderPhoto(currentUrl));
    }
    cardElement.querySelector('.popup__photos').appendChild(fragment);
  }

  function removePhotos(cardElement) {
    var photos = cardElement.querySelectorAll('.popup__photo');
    photos.forEach(photo => {
      photo.remove();
    })
  }

  function renderCard(info) { /* info - объект */
    var card = cardTemplate.cloneNode(true);
    var btnClose = card.querySelector('.popup__close');
    removeFeaturesElements(card);
    insertFeaturesElements(card, info.offer.features);
    removePhotos(card);
    insertPhotos(card, info.offer.photos);
    card.querySelector('.popup__avatar').src = info.author.avatar;
    card.querySelector('.popup__title').textContent = info.offer.title;
    card.querySelector('.popup__text--address').textContent = info.offer.address;
    card.querySelector('.popup__text--price').textContent = info.offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = TYPE_OF_HOUSING[info.offer.type];
    card.querySelector('.popup__text--capacity').textContent = info.offer.rooms + ' комнаты для ' + info.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + info.offer.checkin + ', выезд до ' + info.offer.checkout;
    card.querySelector('.popup__description').textContent = info.offer.description;
    btnClose.addEventListener('click', function(evt) {
      evt.preventDefault();
      card.remove();
    })
    return card;
  }

  function delCards() {
    var cards = map.querySelectorAll('.map__card');
    cards.forEach(card => {
      card.remove();
    })
  }

  function renderPin(info) { /* info - объект */
    var pin = pinTemplate.cloneNode(true);
    var pinImg = pin.querySelector('img');
    pin.style.left = info.location.x + 'px';
    pin.style.top = info.location.y + 'px';
    pinImg.src = info.author.avatar;
    pinImg.alt = info.offer.title;
    pin.addEventListener('click', function(evt) {
      evt.preventDefault();
      delCards();
      map.insertBefore(renderCard(info), filtersContainer);
    })
    return pin;
  }

  function createPinElements(arrPinsInfo) {
    var pins = [];
    for (var i = 0; i < arrPinsInfo.length; i++) {
      pins.push(renderPin(arrPinsInfo[i]));
    }
    return pins;
  }

  window.pins = {
    createPinElements: createPinElements
  }
}())
