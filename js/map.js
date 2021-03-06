// модуль добавляет обработчик клика на главный пин, экспортирует функцию вставки пинов и карточек
'use strict';

(function () {

  var insertCardElement = function (prop) {
    if (window.data.mapElement.contains(window.data.mapElement.querySelector('.map__card'))) {
      window.utilities.removeCardElement();
    }
    window.data.mapElement.insertBefore(window.createCardElement(prop), window.data.mapElement.querySelector('.map__filters-container'));
    document.addEventListener('keydown', window.utilities.cardEscKeydownHandler);
    var cardCloseElement = document.querySelector('.popup__close');
    cardCloseElement.addEventListener('click', window.utilities.removeCardElement);
  };

  var buttonClickHandlerOuter = function (btn, prop) {
    var buttonPinClickHandlerInner = function () {
      insertCardElement(prop);
    };
    return btn.addEventListener('click', buttonPinClickHandlerInner);
  };
  window.data.pinMain.addEventListener('mouseup', window.utilities.enableNoticeForm);
  window.insertButtons = function (data) {
    var fragment = document.createDocumentFragment();
    var btn;
    window.utilities.sortArray(data);
    for (var i = 0; i < 8; i++) {
      btn = window.createButtonElement(data[i]);
      buttonClickHandlerOuter(btn, data[i]);
      fragment.appendChild(btn);
    }
    return document.querySelector('.map__pins').appendChild(fragment);
  };
})();
