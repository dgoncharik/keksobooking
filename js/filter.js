'use strict';

(function() {
  var filterFormElement = document.querySelector('.map__filters');
  var filterItemsElements = Array.from(filterFormElement.querySelectorAll(['select', 'fieldset', 'label']));
  var filterTypeElement = filterFormElement.querySelector('#housing-type');
  var filterPriceElement = filterFormElement.querySelector('#housing-price');
  var filterRoomsElement = filterFormElement.querySelector('#housing-rooms');
  var filterGuestsElement = filterFormElement.querySelector('#housing-guests');
  var filterCheckboxElementList = Array.from(filterFormElement.querySelectorAll('input[type="checkbox"'));
  var data = [];
  var filterCallbak;

  function refreshData(newData) {
    data = newData;
  }

  function setFilterCallback(fn) {
    filterCallbak = fn;
  }

  function getGroupPrice(price) {
    var groupPrice;
    switch (true) {
      case price < 10000:
        groupPrice = 'low';
        break;
      case price >= 10000 && price <= 50000:
        groupPrice = 'middle';
        break;
      case price > 50000:
        groupPrice = 'high';
        break
    }
    return groupPrice;
  }

  function dataValidation(element, currentValueData) {
    return element.value == 'any' || currentValueData == element.value;
  }

  function byType(itemData) {
    return dataValidation(filterTypeElement, itemData.offer.type);
  }

  function byPrice(itemData) {
    return dataValidation(filterPriceElement, getGroupPrice(itemData.offer.price));
  }

  function byRooms(itemData) {
    return dataValidation(filterRoomsElement, itemData.offer.rooms);
  }

  function byGuests(itemData) {
    return dataValidation(filterGuestsElement, itemData.offer.guests);
  }

  function byFeatures(itemData) {
    var selectedFeatures = filterCheckboxElementList.filter(checkbox => {
      return checkbox.checked;
    }).map(checkbox => {
      return checkbox.value;
    })
    var dataFeatures = itemData.offer.features;

    return selectedFeatures.every(element => {
        return dataFeatures.indexOf(element) != -1;
    })
  }

  function filtration(arrData) { /* arrData - [{}, {}...] */
    return arrData.filter(byType).filter(byPrice).filter(byRooms).filter(byGuests).filter(byFeatures);
  }

  filterFormElement.addEventListener('change', function(evt) {
    evt.preventDefault();
    if (filterCallbak) {
      filterCallbak(filtration(data));
    }
  })

  function clearFilter() {
    filterItemsElements.forEach(element => {
      if (element.nodeName === 'SELECT') {
        element.value = 'any';
      }
      if (element.id === 'housing-features') {
        filterCheckboxElementList.forEach(checkbox => {
          checkbox.checked = false;
        })
      }
    })
  }

  function enableFilter() {
    filterItemsElements.forEach(element => {
      element.style.cursor = '';
      element.removeAttribute('disabled');
    });
  }

  function disableFilter() {
    filterItemsElements.forEach(element => {
      clearFilter();
      element.style.cursor = 'default';
      element.disabled = true;
    });
  }

  window.filter = {
    enable: enableFilter,
    disable: disableFilter,
    refreshData: refreshData,
    setCallback: setFilterCallback
  }
}())
