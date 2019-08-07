
'use strict';

(function() {
  var adFormElement = document.querySelector('.ad-form');
  var addressElement = adFormElement.querySelector('#address');
  var priceElement = adFormElement.querySelector('#price');
  var housTypeElement = adFormElement.querySelector('#type');
  var timeInElement = adFormElement.querySelector('#timein');
  var timeOutElement = adFormElement.querySelector('#timeout');
  var formElements = Array.from(adFormElement.querySelectorAll(['input', 'select', 'textarea', 'button', 'label']));
  var htmlClassDisabled = 'ad-form--disabled';
  var onAdFormElementSubmit = null;
  var onAdFormElementReset = null;

  var housingTypeToPrice = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  function setSubmitCallback(fn) {
    onAdFormElementSubmit = fn;
  }

  function setResetCallback(fn) {
    onAdFormElementReset = fn;
  }

  function resetForm() {
    adFormElement.reset();
    if (onAdFormElementReset) {
      onAdFormElementReset();
    }
  }

  function enableForm() {
    formElements.forEach(element => {
      element.style.cursor = '';
      element.removeAttribute('disabled');
    });
    adFormElement.classList.remove(htmlClassDisabled);
  }

  function disableForm() {
    formElements.forEach(element => {
      element.style.cursor = 'default';
      element.disabled = true;
    });
    adFormElement.classList.add(htmlClassDisabled);
  }

  function isFormEnable() {
    return !adFormElement.classList.contains(htmlClassDisabled);
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

  function getFormData() {
    return new FormData(adFormElement);
  }

  function onHousTypeElementClick(evt) {
    setMinPrice(housingTypeToPrice[evt.target.value]);
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

  adFormElement.addEventListener('reset', function() {
    if (onAdFormElementReset) {
      setTimeout(onAdFormElementReset, 0);
    }
  })

  adFormElement.addEventListener('submit', function(evt) {
    if (onAdFormElementSubmit) {
      onAdFormElementSubmit(evt);
    }
  })

  window.form = {
    reset: resetForm,
    enable: enableForm,
    disable: disableForm,
    isEnable: isFormEnable,
    setAddress: setAddress,
    getFormData: getFormData,
    setResetCallback: setResetCallback,
    setSubmitCallback: setSubmitCallback
  };
}())
