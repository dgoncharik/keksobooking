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
  var filterChangeCallbak;

  function refreshData(newData) {
    data = newData;
  }

  function setFilterChangeCallback(fn) {
    filterChangeCallbak = fn;
  }

  function getFilterSettings() {
    return {
      'type': filterTypeElement.value,
      'price': filterPriceElement.value,
      'rooms': filterRoomsElement.value,
      'guests': filterGuestsElement.value,
      'features': filterCheckboxElementList.filter(checkbox => {
        return checkbox.checked;
      }).map(checkbox => {
        return checkbox.value;
      })
    };
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

  function isSameItems(arr1, arr2) {
    return arr1.every(element => {
      return arr2.indexOf(element) != -1;
    })
  }

  function filtration(arrData) { /* arrData - [{}, {}...] */
    var filterSettings = getFilterSettings();
    var settingsList = Object.keys(filterSettings);
    return arrData.filter(currentData => {
      return settingsList.every(settingName => {
        var valueSetting = filterSettings[settingName];
        var valueData = settingName === 'price' ? getGroupPrice(currentData.offer[settingName]) : currentData.offer[settingName];
        return settingName !== 'features' ? valueSetting == 'any' || valueSetting == valueData : isSameItems(filterSettings.features, 
          currentData.offer.features);
      })
    })
  }

  filterFormElement.addEventListener('change', function(evt) {
    evt.preventDefault();
    var filteredData = filtration(data);
    if (filterChangeCallbak) {
      filterChangeCallbak(filteredData);
    }
  })

  function enableFilter() {
    filterItemsElements.forEach(element => {
      element.style.cursor = '';
      element.removeAttribute('disabled');
    });
  }

  function disableFilter() {
    filterItemsElements.forEach(element => {
      element.style.cursor = 'default';
      element.disabled = true;
    });
  }

  window.filter = {
    enable: enableFilter,
    disable: disableFilter,
    refreshData: refreshData,
    setChangeCallback: setFilterChangeCallback
  }
}())
