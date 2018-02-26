// модуль экспортирует функцию для генерации пинов
'use strict';

(function () {
  var buttonTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var BTN_WIDTH = 50;
  var BTN_HEIGHT = 70;
  window.createButtonElement = function (prop) {
    var buttonElement = buttonTemplate.cloneNode(true);
    buttonElement.style.left = (prop.location.x + BTN_WIDTH / 2) + 'px';
    buttonElement.style.top = (prop.location.y + BTN_HEIGHT) + 'px';
    buttonElement.querySelector('img').setAttribute('src', prop.author.avatar);
    return buttonElement;
  };
})();
