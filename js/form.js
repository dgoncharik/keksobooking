
'use strict';

(function() {
  var adForm = document.querySelector('.ad-form');
  var addressElement = adForm.querySelector('#address');
  var priceElement = adForm.querySelector('#price');
  var housTypeElement = adForm.querySelector('#type');
  var timeInElement = adForm.querySelector('#timein');
  var timeOutElement = adForm.querySelector('#timeout');
  var FORM_ELEMENTS = ['input', 'select', 'textarea', 'button'];
  var minPrices = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  function onHousTypeElementClick(evt) {
    window.form.setMinPrice(minPrices[evt.target.value]);
  }

  function onTimeInElementChange() {
    window.form.setValueField(timeOutElement, timeInElement.value);
  }

  function onTimeOutElementChange() {
    window.form.setValueField(timeInElement, timeOutElement.value);
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
    activateForm: function(form, htmlClassDisabled) {
      var elements = form.querySelectorAll(FORM_ELEMENTS);
      for (var i = 0; i < elements.length; i++) {
        elements[i].removeAttribute('disabled');
      }
      if (htmlClassDisabled) {
        form.classList.remove(htmlClassDisabled);
      }
    },

    deactivateForm: function(form,  htmlClassDisabled) {
      var elements = form.querySelectorAll(FORM_ELEMENTS);
      for (var i = 0; i < elements.length; i++) {
        elements[i].disabled = true;
      }
      if (htmlClassDisabled) {
        form.classList.add(htmlClassDisabled);
      }
    },

    setAddress: function(x, y) {
      addressElement.value = x + ', ' + y;
    },

    setMinPrice: function(value) {
      priceElement.min = value;
      priceElement.placeholder = value;
    },

    setValueField: function(field, value) {
      field.value = value;
    }
  };
})()
