'use strict';

(function() {
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var ESC_KEYCODE = 27;

  function renderError(text, tryAgainCallback) {
    var error = errorTemplate.cloneNode(true);
    var btnTryAgain = error.querySelector('.error__button');

    function onDocumentKeydown(evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        evt.preventDefault();
        error.remove();
        document.removeEventListener('keydown', onDocumentKeydown);
      }
    }

    function onBtnTryAgainClick(evt) {
      if (tryAgainCallback) {
        error.remove();
        tryAgainCallback(evt);
      }
    }
    
    btnTryAgain.addEventListener('click', onBtnTryAgainClick)
    document.addEventListener('keydown', onDocumentKeydown);
    error.querySelector('.error__message').textContent = text;
    return error;
  }

  function removeErrors(place) {
    var errors = Array.from(place.querySelectorAll('.error'));
    errors.forEach(error => {
      error.remove();
    });
  }

  function showError(text, placeForError, tryAgainCallback) {
    removeErrors(placeForError);
    placeForError.appendChild(renderError(text, tryAgainCallback));
  }

  window.error = {
    show: showError
  }
}())
