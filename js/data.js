// модуль экспортирует массив для генерации данных и используемые более одного раза данные
'use strict';

(function () {
  window.data = {
    Keycode: {
      ESC: 27,
      ENTER: 13
    },
    mapElement: document.querySelector('.map'),
    pinMainElement: document.querySelector('.map__pin--main'),
    mapFiltersElement: document.querySelector('.map__filters'),
    Notice: {
      formElement: document.querySelector('.notice__form'),
      collection: document.querySelectorAll('fieldset:not(#housing-features)'),
      addressElement: document.querySelector('#address'),
      timeInElement: document.querySelector('#timein'),
      timeOutElement: document.querySelector('#timeout'),
      roomNumberElement: document.querySelector('#room_number'),
      resetElement: document.querySelector('.form__reset'),
      submitBtnElement: document.querySelector('.form__submit'),
      typeElement: document.querySelector('#type'),
      capacityElement: document.querySelector('#capacity'),
      priceElement: document.querySelector('#price'),
      titleElement: document.querySelector('#title')
    }

  };
})();
