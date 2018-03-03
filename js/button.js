// модуль экспортирует функцию для генерации пинов
'use strict';

(function () {
  var BTN_WIDTH = 50;
  var BTN_HEIGHT = 70;
  var buttonElementTemplate = document.querySelector('template').content.querySelector('.map__pin');
  window.createButtonElement = function (proposal) {
    var buttonElement = buttonElementTemplate.cloneNode(true);
    buttonElement.style.left = (proposal.location.x + BTN_WIDTH / 2) + 'px';
    buttonElement.style.top = (proposal.location.y + BTN_HEIGHT) + 'px';
    buttonElement.querySelector('img').setAttribute('src', proposal.author.avatar);
    return buttonElement;
  };
})();
