// модуль экспортирует функцию для генерации пинов
'use strict';

(function () {
  var buttonElementTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var BUTTON_WIDTH = 50;
  var BUTTON_HEIGHT = 70;
  window.createButtonElement = function (proposal) {
    var buttonElement = buttonElementTemplate.cloneNode(true);
    buttonElement.style.left = (proposal.location.x - BUTTON_WIDTH / 2) + 'px';
    buttonElement.style.top = (proposal.location.y - BUTTON_HEIGHT) + 'px';
    buttonElement.querySelector('img').src = proposal.author.avatar;
    return buttonElement;
  };
})();
