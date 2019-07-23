'use strict';
(function() {

  function setAddressToForm() {
    window.form.setAddress(window.map.getMainPinCoordinates());
  }

  function activatePage() {
    window.map.activate();
    window.backend.load(onLoad, onError);
    window.form.enable();
    setAddressToForm();
  }

  function deactivatePage() {
    window.map.deactivate();
    setAddressToForm();
    window.form.disable();
  }

  function onLoad(data) {
    var pins = window.pins.createPinElements(data);
    window.map.addPins(pins);
  }

  function onError(error) {
    console.error(error);
  }

  window.map.setMouseDownCallback(activatePage);
  window.map.setMouseMoveCallback(setAddressToForm);
  window.map.setMouseUpCallback(setAddressToForm);
  // window.backend.upload(a, onLoad, onError);

  deactivatePage();
}())
