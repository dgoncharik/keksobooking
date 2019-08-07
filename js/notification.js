'use strict';

(function() {
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var ESC_KEYCODE = 27;
  var SuccessTime = {
    ASCENT: 700,
    DISPLAY: 1000,
    REMOVE: 900
  };

  // success
  function renderSuccess(text) {
    var success = successTemplate.cloneNode(true);
    success.querySelector('.success__message').innerHtml = text;
    return success;
  }

  function smoothlRemove(element) {
    element.style.transition = 'opacity ' + SuccessTime.REMOVE + 'ms';
    element.style.opacity = '0';
    window.setTimeout(function() {
      element.remove();
    }, SuccessTime.REMOVE);
  }

  function smoothDisplay(element, place) {
    element.style.opacity = '0';
    element.style.transition = 'opacity ' + SuccessTime.ASCENT + 'ms';
    place.appendChild(element);
    setTimeout(function() {
      element.style.opacity = '1';
    }, 0);
  }

  function showSuccess(text, place) {
    var success = renderSuccess(text);
    smoothDisplay(success, place);
    window.setTimeout(function() {
      smoothlRemove(success);
    }, SuccessTime.ASCENT + SuccessTime.DISPLAY);
  }

  // error
  function renderError(text, tryAgainCallback, errorCloseCallback) {
    var error = errorTemplate.cloneNode(true);
    var btnTryAgain = error.querySelector('.error__button');

    function onDocumentKeydown(evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        evt.preventDefault();
        removeError();
        if (errorCloseCallback) {
          errorCloseCallback();
        }
      }
    }

    function onBtnTryAgainClick(evt) {
      if (tryAgainCallback) {
        removeError();
        tryAgainCallback(evt);
      }
    }

    function removeError() {
      error.remove();
      document.removeEventListener('keydown', onDocumentKeydown);
    }

    btnTryAgain.addEventListener('click', onBtnTryAgainClick);
    document.addEventListener('keydown', onDocumentKeydown);
    error.querySelector('.error__message').textContent = text;
    return error;
  }

  function removeErrors() {
    var errors = Array.from(document.querySelectorAll('.error'));
    errors.forEach(error => {
      error.remove();
    });
  }

  function showError(text, place, tryAgainCallback, errorCloseCallback) {
    removeErrors();
    place.appendChild(renderError(text, tryAgainCallback, errorCloseCallback));
  }

  window.notification = {
    success: showSuccess,
    error: showError
  }
}())
