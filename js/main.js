'use strict';
(function() {
  var adForm = document.querySelector('.ad-form');
  var placeForAdFormError = document.querySelector('main');

  function setAddressToForm() {
    window.form.setAddress(window.map.getMainPinCoordinates());
  }

  function activatePage() {
    window.map.activate();
    window.backend.load(onLoadDataDone, onLoadDataError);
    window.form.enable();
    setAddressToForm();
  }

  function deactivatePage() {
    window.map.deactivate();
    setAddressToForm();
    window.form.disable();
  }

  function onLoadDataDone(data) {
    var pins = window.pins.createPinElements(data);
    window.map.addPins(pins);
  }

  function onLoadDataError(error) {
    console.error(error);
  }

  function onUploadAdformDone(data) {
    console.log('done', data);
  }

  function onUploadAdformError(error) {
    window.error.show(error, placeForAdFormError, onSubmitAdForm);
  }

  function onSubmitAdForm(evt) {
    if (evt) {
      evt.preventDefault();
    };
    var data = new FormData(adForm);
    window.backend.upload(data, onUploadAdformDone, onUploadAdformError);
  }

  window.map.setMouseDownCallback(activatePage);
  window.map.setMouseMoveCallback(setAddressToForm);
  window.map.setMouseUpCallback(setAddressToForm);
  adForm.addEventListener('submit', onSubmitAdForm);

  deactivatePage();
}())
