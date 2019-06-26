'use strict';
(function() {
  var adsInfo = window.data.generateData(8);
  var pins = window.createPinElements(adsInfo);

  function setAddressToForm() {
    window.form.setAddress(window.map.getMainPinCoordinates());
  }

  function activatePage() {
    window.map.activate();
    window.map.addPins(pins);
    window.form.enable();
    setAddressToForm();
  }

  function deactiovatePage() {
    window.map.deactivate();
    window.form.disable();
  }

  window.map.setMouseDownCallback(activatePage);
  window.map.setMouseMoveCallback(setAddressToForm);
  window.map.setMouseUpCallback(setAddressToForm);

  deactiovatePage();
}())
