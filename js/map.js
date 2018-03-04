// модуль добавляет обработчик клика на главный пин, экспортирует функцию вставки пинов и карточек
'use strict';

(function () {
  var MAX_PINS = 5;
  var insertCardElement = function (proposal) {
    if (window.data.mapElement.contains(window.data.mapElement.querySelector('.map__card'))) {
      window.utilities.removeCardElementHandler();
    }
    window.data.mapElement.insertBefore(window.createCardElement(proposal), window.data.mapElement.querySelector('.map__filters-container'));
    document.addEventListener('keydown', window.utilities.cardEscKeydownHandler);
    var cardCloseElement = window.data.mapElement.querySelector('.popup__close');
    cardCloseElement.addEventListener('click', window.utilities.removeCardElementHandler);
  };

  var buttonClickOuterHandler = function (pin, proposal) {
    var buttonClickInnerHandler = function () {
      insertCardElement(proposal);
    };
    return pin.addEventListener('click', buttonClickInnerHandler);
  };

  window.data.pinMainElement.addEventListener('mouseup', window.utilities.enableNoticeFormHandler);
  window.insertButtons = function (items) {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < pins; i++) {
      document.querySelector('.map__pins').removeChild(pins[i]);
    }
    var fragment = document.createDocumentFragment();
    var pin;
    window.utilities.sortArray(items);
    for (i = 0; i < Math.min(MAX_PINS, items.length); i++) {
      pin = window.createButtonElement(items[i]);
      buttonClickOuterHandler(pin, items[i]);
      fragment.appendChild(pin);
    }
    return document.querySelector('.map__pins').appendChild(fragment);
  };
})();
