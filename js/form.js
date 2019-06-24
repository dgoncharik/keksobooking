
'use strict';

(function() {
  var adForm = document.querySelector('.ad-form');
  var address = adForm.querySelector('#address');
  var price = adForm.querySelector('#price');
  var typeOfHousing = adForm.querySelector('#type');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
  var FORM_ELEMENTS = ['input', 'select', 'textarea', 'button'];

  function onTypeOfHousingClick() {
    var options = typeOfHousing.options;
    var currentOption = options[options.selectedIndex];
    window.form.setMinPrice(currentOption.dataset.minPrice);
  }

  function onTimeInChange() {
    window.form.setValueField(timeOut, timeIn.value);
  }

  function onTimeOutChange() {
    window.form.setValueField(timeIn, timeOut.value);
  }

  typeOfHousing.addEventListener('change', function() {
    onTypeOfHousingClick();
  })

  timeIn.addEventListener('change', function() {
    onTimeInChange();
  })

  timeOut.addEventListener('change', function() {
    onTimeOutChange();
  })

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
      address.value = x + ', ' + y;
    },

    setMinPrice: function(value) {
      price.min = value;
      price.placeholder = value;
    },

    setValueField: function(field, value) {
      field.value = value;
    }
  }
})()

