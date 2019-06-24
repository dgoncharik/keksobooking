'use strict';

(function() {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mapFilters = map.querySelector('.map__filters');
  var MAP_BOUNDARIES = {
    LEFT: 0,
    RIGHT: map.offsetWidth,
    TOP: 130,
    BOTTOM: 630
  };

  var data = window.data.generateData(8);
  var pins = window.pin.renderPins(data);

  window.map = {
    activated: false,

    activateMap: function() {
      window.map.activated = true;
      window.pin.displayPinsToMap(pins);
      map.classList.remove('map--faded');
      window.form.activateForm(adForm, 'ad-form--disabled');
      window.form.activateForm(mapFilters);
    },

    deactivateMap: function() {
      window.map.activated = false;
      map.classList.add('map--faded');
      window.form.deactivateForm(adForm, 'ad-form--disabled');
      window.form.deactivateForm(mapFilters);
    },

    getMapBoundares: function() {
      return MAP_BOUNDARIES
    }
  };

  window.map.deactivateMap();
})();
