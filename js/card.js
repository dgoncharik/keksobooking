'use strict';

(function(){
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var housingTypeToRusLang = {
    'bungalo': 'Бунгало',
    'flat': 'Квартира',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  var featureToHtmlClassName = {
      'wifi': 'popup__feature--wifi',
      'dishwasher': 'popup__feature--dishwasher',
      'parking': 'popup__feature--parking',
      'washer': 'popup__feature--washer',
      'elevator': 'popup__feature--elevator',
      'conditioner': 'popup__feature--conditioner'
  };

  function renderFeatureElement(feature) {
    var featureElement = document.createElement('li');
    featureElement.classList.add('popup__feature');
    featureElement.classList.add(featureToHtmlClassName[feature]);
    return featureElement;
  }

  function insertFeaturesElements(cardElement, arrTypesFeatures) {
    var fragment = document.createDocumentFragment();
    arrTypesFeatures.forEach(featureType => {
      var featureElement = renderFeatureElement(featureType);
      fragment.appendChild(featureElement);
    });
    cardElement.querySelector('.popup__features').appendChild(fragment);
  }

  function removeFeaturesElements(cardElement) {
    var features = Array.from(cardElement.querySelectorAll('.popup__feature'));
    features.forEach(feature => {
      feature.remove();
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

  function insertPhotos(cardElement, arrUrls) {
    var fragment = document.createDocumentFragment();
    arrUrls.forEach(url => {
      var imgElement = renderPhoto(url);
      fragment.appendChild(imgElement);
    });
    cardElement.querySelector('.popup__photos').appendChild(fragment);
  }

  function removePhotos(cardElement) {
    var photos = Array.from(cardElement.querySelectorAll('.popup__photo'));
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
    card.querySelector('.popup__type').textContent = housingTypeToRusLang[info.offer.type];
    card.querySelector('.popup__text--capacity').textContent = info.offer.rooms + ' комнаты для ' + info.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + info.offer.checkin + ', выезд до ' + info.offer.checkout;
    card.querySelector('.popup__description').textContent = info.offer.description;
    btnClose.addEventListener('click', function(evt) {
      evt.preventDefault();
      card.remove();
    })
    return card;
  }

  function removeAllFromDom() {
    var cards = Array.from(document.querySelectorAll('.map__card'));
    cards.forEach(card => {
      card.remove();
    })
  }

  window.card = {
    render: renderCard,
    removeAllFromDom: removeAllFromDom
  }
}())