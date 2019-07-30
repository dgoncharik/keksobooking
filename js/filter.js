'use strict';

(function(){
  var filter = document.querySelector('.map__filters');
  var filterElements = Array.from(filter.querySelectorAll(['select', 'fieldset', 'label']));

  function enableFilter() {
    filterElements.forEach(element => {
      element.style.cursor = '';
      element.removeAttribute('disabled');
    });
  }

  function disableFilter() {
    filterElements.forEach(element => {
      element.style.cursor = 'default';
      element.disabled = true;
    });
  }

  window.filter = {
    enable: enableFilter,
    disable: disableFilter
  }
}())


