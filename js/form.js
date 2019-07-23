
'use strict';

(function() {
  var adForm = document.querySelector('.ad-form');
  var addressElement = adForm.querySelector('#address');
  var priceElement = adForm.querySelector('#price');
  var housTypeElement = adForm.querySelector('#type');
  var timeInElement = adForm.querySelector('#timein');
  var timeOutElement = adForm.querySelector('#timeout');
  var formElements = adForm.querySelectorAll(['input', 'select', 'textarea', 'button', 'label']);
  var htmlClassDisabled = 'ad-form--disabled';
  var MIN_PRICES = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  function enableForm() {
    for (var i = 0; i < formElements.length; i++) {
      formElements[i].style.cursor = '';
      formElements[i].removeAttribute('disabled');
    }
    adForm.classList.remove(htmlClassDisabled);
  }

  function disableForm() {
    for (var i = 0; i < formElements.length; i++) {
      formElements[i].style.cursor = 'default';
      formElements[i].disabled = true;
    }
    adForm.classList.add(htmlClassDisabled);
  }

  function setAddress(coord) { /* coord = {x: value, y: value} */
    addressElement.value = coord.x + ', ' + coord.y;
  }

  function setMinPrice(value) {
    priceElement.min = value;
    priceElement.placeholder = value;
  }

  function setValueField(field, value) {
    field.value = value;
  }

  function onHousTypeElementClick(evt) {
    setMinPrice(MIN_PRICES[evt.target.value]);
  }

  function onTimeInElementChange() {
    setValueField(timeOutElement, timeInElement.value);
  }

  function onTimeOutElementChange() {
    setValueField(timeInElement, timeOutElement.value);
  }

  housTypeElement.addEventListener('change', function(evt) {
    onHousTypeElementClick(evt);
  });

  timeInElement.addEventListener('change', function() {
    onTimeInElementChange();
  });

  timeOutElement.addEventListener('change', function() {
    onTimeOutElementChange();
  });

  window.form = {
    enable: enableForm,
    disable: disableForm,
    setAddress: setAddress
  };
}())
