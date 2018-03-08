'use strict';

(function () {
  var TIMEOUT = 10000;
  var Code = {
    SUCCESS: 200,
    CASHED: 304
  };
  var Url = {
    LOAD: 'https://js.dump.academy/keksobooking/data',
    SEND: 'https://js.dump.academy/keksobooking'
  };
  var treatXhr = function (xhr, onLoad, onError) {
    xhr.addEventListener('load', function () {
      if (xhr.status === Code.SUCCESS || xhr.status === Code.CASHED) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIMEOUT;
  };
  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      treatXhr(xhr, onLoad, onError);
      xhr.open('GET', Url.LOAD);
      xhr.send(xhr.response);
    },
    send: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      treatXhr(xhr, onLoad, onError);
      xhr.open('POST', Url.SEND);
      xhr.send(data);
    }
  };
})();
