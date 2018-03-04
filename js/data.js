// модуль экспортирует массив для генерации данных и используемые более одного раза данные
'use strict';

(function () {
  window.data = {
    keycode: {
      ESC: 27,
      ENTER: 13
    },
    pinMainValues: {
      WIDTH: 65,
      HEIGHT: 65,
      AFTER_HEIGHT: 18,
      Z_INDEX: 999
    },
    mapElement: document.querySelector('.map'),
    pinMainElement: document.querySelector('.map__pin--main'),
    mapFiltersElement: document.querySelector('.map__filters'),
    notice: {
      formElement: document.querySelector('.notice__form'),
      fieldsets: document.querySelectorAll('fieldset:not(#housing-features)'),
      addressElement: document.querySelector('#address'),
      timeInElement: document.querySelector('#timein'),
      timeOutElement: document.querySelector('#timeout'),
      roomNumberElement: document.querySelector('#room_number'),
      resetElement: document.querySelector('.form__reset'),
      submitButtonElement: document.querySelector('.form__submit'),
      typeElement: document.querySelector('#type'),
      capacityElement: document.querySelector('#capacity'),
      priceElement: document.querySelector('#price'),
      titleElement: document.querySelector('#title')
    }
  };
})();
