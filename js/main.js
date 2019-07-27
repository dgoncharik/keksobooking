'use strict';
(function() {

  function setAddressToForm() {
    window.form.setAddress(window.map.getMainPinCoordinates());
  }

  function loadPinsData() {
    window.backend.load(onLoadPinsDataDone, onLoadPinsDataError);
  }

  function activatePage() {
    window.map.activate();
    loadPinsData();
    window.form.enable();
    setAddressToForm();
  }

  function deactivatePage() {
    window.map.deactivate();
    setAddressToForm();
    window.form.disable();
  }

  function onLoadPinsDataDone(data) {
    var pins = window.pins.createPinElements(data);
    window.map.addPins(pins);
  }

  function onLoadPinsDataError(error) {
    alert(error);
  }

  function formDataUploadDone(data) {
    console.log('Upload done.\nData: ', data);
    window.form.reset();
  }

  function formDataUploadError(error) {
    var placeForError = document.querySelector('main');
    window.error.show(error, placeForError, submitForm);
  }

  function submitForm(evt) {
    if (evt) {
      evt.preventDefault();
    };
    var data = new FormData(window.form.element);
    window.backend.upload(data, formDataUploadDone, formDataUploadError);
  }

  window.map.setMouseDownCallback(activatePage);
  window.map.setMouseMoveCallback(setAddressToForm);
  window.map.setMouseUpCallback(setAddressToForm);
  window.form.setSubmitCallback(submitForm);

  deactivatePage();
}())
