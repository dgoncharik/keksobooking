'use strict';
(function(){
  var Url = {
    LOAD: 'https://js.dump.academy/keksobooking/data',
    UPLOAD: 'https://js.dump.academy/keksobooking'
  }

  var Code = {
    SUCCESS: 200,
    NOT_AUTHORIZED: 401,
    NO_ACCESS: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
  };

  function createXhr(onLoadCallback, onErrorCallback) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function() {
      var error;
      switch (xhr.status) {
        case Code.SUCCESS:
          onLoadCallback(xhr.response);
          break;
        case Code.NOT_AUTHORIZED:
          error = xhr.status + ' Пользователь не авторизован.';
          break;
        case Code.NO_ACCESS:
          error = xhr.status + ' Отклонено. Нет доступа.';
          break;
        case Code.NOT_FOUND:
          error = xhr.status + ' Запрашиваемый ресурс не найден.';
          break;
        case Code.SERVER_ERROR:
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
      onErrorCallback('Ошибка соеденения!');
    });

    xhr.addEventListener('timeout', function() {
      onErrorCallback('Превышен таймаут ожидания выполнения запроса: ' + xhr.timeout + 'мс')
    })

    return xhr;
  }

  function load(onLoadCallback, onErrorCallback) {
    var loadXhr = createXhr(onLoadCallback, onErrorCallback);
    loadXhr.open('GET', Url.LOAD);
    loadXhr.send();
  }

  function upload(data, onLoadCallback, onErrorCallback) {
    var uploadXhr = createXhr(onLoadCallback, onErrorCallback);
    uploadXhr.open('POST', Url.UPLOAD);
    uploadXhr.send(data);
  }

  window.backend = {
    load: load,
    upload: upload
  }
}())
