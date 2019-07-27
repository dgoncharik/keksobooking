'use strict';

(function() {
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var ESC_KEYCODE = 27;

  function renderError(text, callback) {
    var error = errorTemplate.cloneNode(true);
    var btnTryAgain = error.querySelector('.error__button');
    function onDocumentKeydown(evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        evt.preventDefault();
        error.remove();
        document.removeEventListener('keydown', onDocumentKeydown);
      }
    }
    document.addEventListener('keydown', onDocumentKeydown);
    error.querySelector('.error__message').textContent = text;
    btnTryAgain.addEventListener('click', function(evt) {
      evt.preventDefault();
      if (callback) {
        error.remove();
        callback();
      }
    })
    return error;
  }

  function showError(text, placeForError, callback) {
    var oldErrors = Array.from(placeForError.querySelectorAll('.error'));
    oldErrors.forEach(error => {
      error.remove();
    });
    placeForError.appendChild(renderError(text, callback));
  }

  window.error = {
    show: showError
  }
}())
