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
  var filterCallbak;

  var filterSetting = {
    type: filterTypeElement.value,
    price: filterPriceElement.value,
    rooms: filterRoomsElement.value,
    guests: filterGuestsElement.value,
    features: new Set(featuresCheckboxElements.filter(checkbox => {
      return checkbox.checked;
    }).map(checkbox => {
      return checkbox.value;
    }))
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

  function getGroupPrice(price) {
    var groupPrice;
    switch (price) {
      case price < 10000:
        groupPrice = 'low';
        break;
      case price >= 10000 && price <= 50000:
        groupPrice = 'middle';
        break;
      case price < 50000:
        groupPrice = 'high';
        break
    }
    console.log(groupPrice);
    return groupPrice;
  }

  function dataFiltering(arrData) { /* arrData - [{}, {}...] */
    var filteredData = [];
    arrData.forEach(itemInfo => {
      if (filterSetting.type === itemInfo.offer.type &&
          filterSetting.price === getGroupPrice(itemInfo.offer.price) &&
          filterSetting.rooms === itemInfo.offer.rooms &&
          filterSetting.guests === itemInfo.offer.guests) {
            filteredData.push(itemInfo);
          }
    });
    if (filterCallbak) {
      filterCallbak(filteredData);
    }
  }

  filterTypeElement.addEventListener('change', function(evt) {
    evt.preventDefault();
    filterSetting.type = filterTypeElement.value;
    console.log(filterSetting);
  })


  filterPriceElement.addEventListener('change', function(evt) {
    evt.preventDefault();
    filterSetting.price = filterPriceElement.value;
    console.log(filterSetting);
  })

  filterRoomsElement.addEventListener('change', function(evt) {
    evt.preventDefault();
    filterSetting.rooms = filterRoomsElement.value;
    console.log(filterSetting);
  })

  filterGuestsElement.addEventListener('change', function(evt) {
    evt.preventDefault();
    filterSetting.guests = filterGuestsElement.value;
    console.log(filterSetting);
  })

  featuresCheckboxElements.forEach(checkbox => {
    checkbox.addEventListener('change', function(evt) {
      evt.preventDefault();
      var feature = checkbox.value;
      if (checkbox.checked) {
        filterSetting.features.add(feature);
      } else {
        filterSetting.features.delete(feature)
      }
      console.log(filterSetting);
    })
  })
  console.log(filterSetting);

  window.filter = {
    enable: enableFilter,
    disable: disableFilter
  }
}())
