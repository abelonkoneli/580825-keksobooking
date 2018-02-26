// модуль экспортирует массив для генерации данных и используемые более одного раза данные
'use strict';

(function () {
  window.data = {
    proposals: [],
    titles: [
      'Большая уютная квартира',
      'Маленькая неуютная квартира',
      'Огромный прекрасный дворец',
      'Маленький ужасный дворец',
      'Красивый гостевой домик',
      'Некрасивый негостеприимный домик',
      'Уютное бунгало далеко от моря',
      'Неуютное бунгало по колено в воде'
    ],
    featuresArrCopy: [
      'wifi',
      'dishwasher',
      'parking',
      'washer',
      'elevator',
      'conditioner'
    ],
    types: [
      'flat',
      'house',
      'bungalo',
      'palace'
    ],
    type: [],
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,
    mapElement: document.querySelector('.map'),
    noticeForm: document.querySelector('.notice__form'),
    noticeCollection: document.querySelectorAll('fieldset:not(#housing-features)'),
    noticeAddress: document.querySelector('#address'),
    noticeTimeIn: document.querySelector('#timein'),
    noticeTimeOut: document.querySelector('#timeout'),
    pinMain: document.querySelector('.map__pin--main'),
    noticeRoomNumber: document.querySelector('#room_number'),
    noticeReset: document.querySelector('.form__reset'),
    noticeSubmitBtn: document.querySelector('.form__submit'),
    noticeType: document.querySelector('#type'),
    noticeCapacity: document.querySelector('#capacity'),
    noticePrice: document.querySelector('#price'),
    noticeTitle: document.querySelector('#title')
  };
})();
