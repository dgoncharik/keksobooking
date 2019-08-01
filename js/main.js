'use strict';
(function() {
  var pinsData;
  var MAX_PINS_ON_MAP; /* 5 */

  function setAddressToForm() {
    window.form.setAddress(window.map.getMainPinCoordinates());
  }

  function loadPinsData() {
    window.backend.load(onLoadPinsDataDone, onLoadPinsDataError);
  }

  function insertPinsInDom(data) {
    var pinElements = window.pins.renderElements(data, pinClickCallback);
    window.pins.removeAllFromDom();
    window.pins.insertInDom(pinElements, MAX_PINS_ON_MAP);
  }

  function pinClickCallback(evt, pinInfo) {
    evt.preventDefault();
    var map = window.map.element;
    var card = window.card.render(pinInfo);
    window.card.removeAllFromDom();
    map.insertBefore(card, map.querySelector('.map__filters-container'));
  }

  function activatePage() {
    window.map.activate();
    window.filter.enable();
    loadPinsData();
    window.form.enable();
    setAddressToForm();
  }

  function deactivatePage() {
    window.pins.removeAllFromDom();
    window.map.deactivate();
    window.filter.disable();
    setAddressToForm();
    window.form.disable();
  }

  function onLoadPinsDataDone(data) {
    pinsData = data;
    window.filter.refreshData(data);
    insertPinsInDom(pinsData);
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
    window.error.show(error, placeForError, formSubmitCallback);
  }

  function formSubmitCallback(evt) {
    evt.preventDefault();
    var data = new FormData(window.form.element);
    window.backend.upload(data, formDataUploadDone, formDataUploadError);
  }

  window.map.setMouseDownCallback(activatePage);
  window.map.setMouseMoveCallback(setAddressToForm);
  window.map.setMouseUpCallback(setAddressToForm);
  window.form.setSubmitCallback(formSubmitCallback);
  window.filter.setChangeCallback(insertPinsInDom);

  deactivatePage();
}())
