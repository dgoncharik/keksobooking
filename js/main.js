'use strict';
(function() {

  function setAddressToForm() {
    window.form.setAddress(window.map.getMainPinCoordinates());
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
    window.backend.load(onLoadPinsDataDone, onLoadPinsDataError);
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
    var pinElements = window.pins.renderElements(data, pinClickCallback);
    window.pins.removeAllFromDom();
    window.pins.insertAllInDom(pinElements);
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

  deactivatePage();
}())
