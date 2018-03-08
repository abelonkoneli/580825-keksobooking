// модуль экспортирует функцию для генерации пинов
'use strict';

(function () {
  var BUTTON_HEIGHT = 70;
  var buttonElementTemplate = document.querySelector('template').content.querySelector('.map__pin');
  window.createButtonElement = function (proposal) {
    var buttonElement = buttonElementTemplate.cloneNode(true);
    buttonElement.style.left = proposal.location.x + 'px';
    buttonElement.style.top = (proposal.location.y - BUTTON_HEIGHT / 2) + 'px';
    buttonElement.querySelector('img').src = proposal.author.avatar;
    return buttonElement;
  };
})();
