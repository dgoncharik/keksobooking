'use strict';

(function() {
  var filterFormElement = document.querySelector('.map__filters');
  var childFilterElements = Array.from(filterFormElement.querySelectorAll(['select', 'fieldset', 'label']));
  var filterTypeElement = filterFormElement.querySelector('#housing-type');
  var filterPriceElement = filterFormElement.querySelector('#housing-price');
  var filterRoomsElement = filterFormElement.querySelector('#housing-rooms');
  var filterGuestsElement = filterFormElement.querySelector('#housing-guests');
  var filterFeaturesElement = filterFormElement.querySelector('#housing-features');
  var featuresCheckboxElements = Array.from(filterFeaturesElement.querySelectorAll('input[type="checkbox"'));
  var data;
  var filterChangeCallbak;

  function refreshData(newData) {
    data = newData;
  }

  function setFilterChangeCallback(fn) {
    filterChangeCallbak = fn;
  }

  function getFilterSettings() {
    var filterSettings = {
      'type': filterTypeElement.value,
      'price': filterPriceElement.value,
      'rooms': filterRoomsElement.value,
      'guests': filterGuestsElement.value,
      'features': featuresCheckboxElements.filter(checkbox => {
        return checkbox.checked;
      }).map(checkbox => {
        return checkbox.value;
      })
    };
    return filterSettings;
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

  function filtration(arrData) { /* arrData - [{}, {}...] */
    var filterSettings = getFilterSettings();
    var filteredData = [];
    var param = Object.keys(filterSettings);
    filteredData = arrData.filter(curData => {
      param.forEach(curParam => {
        var curDataOffer = curParam === 'price' ? getGroupPrice(curData.offer[curParam]) : curData.offer[curParam];
        console.log(curParam, curDataOffer + '==' + filterSettings[curParam])
        if (filterSettings[curParam] != 'any' || filterSettings[curParam] != []) {}
      })
    })
    // console.log(filterSettings);
    console.log(filteredData);
    return filteredData;
  }

  filterFormElement.addEventListener('change', function(evt) {
    evt.preventDefault();
    var filteredData = filtration(data);
    if (filterChangeCallbak) {
      filterChangeCallbak(filteredData);
    }
  })
  // console.log(Object.keys(getFilterSettings()))

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

  window.filter = {
    enable: enableFilter,
    disable: disableFilter,
    refreshData: refreshData,
    setChangeCallback: setFilterChangeCallback
  }
}())
