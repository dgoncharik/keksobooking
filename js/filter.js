'use strict';

(function() {
  var filterFormElement = document.querySelector('.map__filters');
  var childFilterElements = Array.from(filterFormElement.querySelectorAll(['select', 'fieldset', 'label']));

  var filterElement = {
    type: filterFormElement.querySelector('#housing-type'),
    price: filterFormElement.querySelector('#housing-price'),
    housingRooms: filterFormElement.querySelector('#housing-rooms'),
    guests: filterFormElement.querySelector('#housing-guests'),
    features: filterFormElement.querySelector('#housing-features')
  };

  function enableFilter() {
    childFilterElements.forEach(element => {
      element.style.cursor = '';
      element.removeAttribute('disabled');
    });
  }

  function disableFilter() {
    childFilterElements.forEach(element => {
      element.style.cursor = 'default';
      element.disabled = true;
    });
  }

  console.log('filterFormElement:\n', filterFormElement);
  console.log(filterElement);

  window.filter = {
    enable: enableFilter,
    disable: disableFilter
  }
}())


