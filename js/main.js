'use strict';
(function() {
  var adFormElement = document.querySelector('.ad-form');

  function setAddressToForm() {
    window.form.setAddress(window.map.getMainPinCoordinates());
  }

  function loadData() {
    window.backend.load(onLoadDataDone, onLoadDataError);
  }

  function activatePage() {
    window.map.activate();
    loadData();
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
    alert(error);
  }

  function onAdFormElementUploadDone(data) {
    console.log('Upload done.\nData: ', data);
    adFormElement.reset();
  }

  function onAdFormElementUploadError(error) {
    window.error.show(error, document.querySelector('main'), onAdFormElementSubmit);
  }

  function onAdFormElementSubmit(evt) {
    if (evt) {
      evt.preventDefault();
    };
    var data = new FormData(adFormElement);
    window.backend.upload(data, onAdFormElementUploadDone, onAdFormElementUploadError);
  }

  window.map.setMouseDownCallback(activatePage);
  window.map.setMouseMoveCallback(setAddressToForm);
  window.map.setMouseUpCallback(setAddressToForm);
  adFormElement.addEventListener('submit', onAdFormElementSubmit);

  deactivatePage();
}())
