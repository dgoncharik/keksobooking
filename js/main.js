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
    window.pins.removeFromDom();
    window.map.deactivate();
    setAddressToForm();
    window.form.disable();
  }

  function onLoadPinsDataDone(data) {
    var filteredData = data;
    // TODO Запилить filter в отдельный модуль из map
    window.pins.insertInDom(filteredData);
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
    window.error.show(error, placeForError, onFormSubmit);
  }

  function onFormSubmit(evt) {
    evt.preventDefault();
    var data = new FormData(window.form.element);
    window.backend.upload(data, formDataUploadDone, formDataUploadError);
  }

  window.map.setMouseDownCallback(activatePage);
  window.map.setMouseMoveCallback(setAddressToForm);
  window.map.setMouseUpCallback(setAddressToForm);
  window.form.setSubmitCallback(onFormSubmit);

  deactivatePage();
}())
