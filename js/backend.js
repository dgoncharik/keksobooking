'use strict';
(function(){
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';

  function createXhr(onLoadCallback, onErrorCallback) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function() {
      var error;
      switch (xhr.status) {
        case 200:
          onLoadCallback(xhr.response);
          break;
        case 401:
          error = xhr.status + ' Пользователь не авторизован.';
          break;
        case 403:
          error = xhr.status + ' Отклонено. Нет доступа.';
          break;
        case 404:
          error = xhr.status + ' Запрашиваемый ресурс не найден.';
          break;
        case 500:
          error = xhr.status + ' Внутренняя ошибка сервера';
          break;

        default:
          error = 'Ошибка! Статус ответа: ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        onErrorCallback(error);
      }
    });

    xhr.addEventListener('error', function() {
      onErrorCallback('Произошла ошибка соеденения! Попробуйте обновить страницу.');
    });

    xhr.addEventListener('timeout', function() {
      onErrorCallback('Превышен таймаут ожидания выполнения запроса: ' + xhr.timeout + 'мс')
    })

    return xhr;
  }

  function load(onLoadCallback, onErrorCallback) {
    var loadXhr = createXhr(onLoadCallback, onErrorCallback);
    loadXhr.open('GET', URL_LOAD);
    loadXhr.send();
  }

  function upload(data, onLoadCallback, onErrorCallback) {
    var uploadXhr = createXhr(onLoadCallback, onErrorCallback);
    uploadXhr.open('POST', URL_UPLOAD);
    uploadXhr.send(data);
  }

  window.backend = {
    load: load,
    upload: upload
  }
}())
