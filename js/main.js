'use strict';
(function() {
  var MAX_PINS_ON_MAP; /* 5 */
  var FILTER_DEBOUNCE_INTERVALL = 500;
  var mainElement = document.querySelector('main');

  function setAddressToForm() {
    window.form.setAddress(window.map.getMainPinCoordinates());
  }

  function loadPinsData() {
    window.backend.load(onLoadPinsDataDone, onLoadPinsDataError);
  }

  function insertPinsInDom(data) {
    var pinElements = window.pins.renderElements(data, pinClickCallback);
    window.pins.removeAllFromDom();
    window.card.removeAllFromDom();
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
    window.filter.refreshData(data);
    insertPinsInDom(data);
  }

  function onLoadPinsDataError(error) {
    window.notification.error(error, mainElement, loadPinsData)
  }

  function formDataUploadDone(data) {
    console.log('Upload done! \n', data);
    window.notification.success('Ваше объявление<br>успешно размещено!', mainElement);
    window.form.reset();
    window.form.enable();
    setAddressToForm();
  }

  function formDataUploadError(error) {
    window.notification.error(error, mainElement, formSubmitCallback, window.form.enable);
  }

  function formSubmitCallback(evt) {
    evt.preventDefault();
    var data = window.form.getFormData();
    window.form.disable();
    window.backend.upload(data, formDataUploadDone, formDataUploadError);
  }

  window.map.setMouseDownCallback(activatePage);
  window.map.setMouseMoveCallback(setAddressToForm);
  window.map.setMouseUpCallback(setAddressToForm);
  window.form.setSubmitCallback(formSubmitCallback);
  window.filter.setChangeCallback(window.debounce(insertPinsInDom, FILTER_DEBOUNCE_INTERVALL));

  deactivatePage();
}())
