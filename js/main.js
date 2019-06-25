'use strict';
(function() {
  var adsInfo = window.data.generateData(8);
  var pins = window.createPinElements(adsInfo);

  function activatePage() {
    window.map.activate();
    window.map.enableFilter();
    window.map.addPins(pins);
    window.form.enable();
    window.form.setAddress(window.map.getMainPinCoordinates());
  }

  window.map.setMouseDownCallback(activatePage);
}())
