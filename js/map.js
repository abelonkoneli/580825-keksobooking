// модуль добавляет обработчик клика на главный пин, экспортирует функцию вставки пинов и карточек
'use strict';

(function () {
  var MAX_PINS = 5;
  var insertCardElement = function (proposal) {
    if (window.data.mapElement.contains(window.data.mapElement.querySelector('.map__card'))) {
      window.utilities.removeCardElement();
    }
    window.data.mapElement.insertBefore(window.createCardElement(proposal), window.data.mapElement.querySelector('.map__filters-container'));
    document.addEventListener('keydown', window.utilities.cardEscKeydownHandler);
    var cardCloseElement = document.querySelector('.popup__close');
    cardCloseElement.addEventListener('click', window.utilities.removeCardElement);
  };

  var buttonClickOuterHandler = function (btn, proposal) {
    var buttonClickInnerHandler = function () {
      insertCardElement(proposal);
    };
    return btn.addEventListener('click', buttonClickInnerHandler);
  };

  window.data.pinMainElement.addEventListener('mouseup', window.utilities.enableNoticeForm);
  window.insertButtons = function (data) {
    var pinCollection = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < pinCollection; i++) {
      document.querySelector('.map__pins').removeChild(pinCollection[i]);
    }
    var fragment = document.createDocumentFragment();
    var btn;
    window.utilities.sortArray(data);
    for (i = 0; i < Math.min(MAX_PINS, data.length); i++) {
      btn = window.createButtonElement(data[i]);
      buttonClickOuterHandler(btn, data[i]);
      fragment.appendChild(btn);
    }
    return document.querySelector('.map__pins').appendChild(fragment);
  };
})();
