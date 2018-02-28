// модуль описывает поведение формы notice__form
'use strict';

(function () {

  window.utilities.disableNoticeForm();

  var roomsCapacityClickHandler = function () {
    if (+window.data.noticeRoomNumber.value < +window.data.noticeCapacity.value) {
      window.data.noticeCapacity.setCustomValidity('Гостей не может быть больше, чем комнат');
    } else if (window.data.noticeRoomNumber.value === '100' && (window.data.noticeCapacity.value !== '0')) {
      window.data.noticeCapacity.setCustomValidity('Сто комнат не рассчитаны на гостей');
    } else if (window.data.noticeRoomNumber.value !== '100' && window.data.noticeCapacity.value === '0') {
      window.data.noticeCapacity.setCustomValidity('Гостей не может быть меньше одного');
    } else {
      window.data.noticeCapacity.setCustomValidity('');
    }
  };
  var priceClickHandler = function (evt) {
    if (!evt.invalid) {
      window.data.noticePrice.classList.remove('bordered');
    }
    var typeMinPrices = {
      bungalo: '0',
      flat: '1000',
      house: '5000',
      palace: '10000'
    };
    if (window.data.noticeType.value === window.data.types[0]) {
      window.data.noticePrice.min = typeMinPrices.flat;
    } else if (window.data.noticeType.value === window.data.types[2]) {
      window.data.noticePrice.min = typeMinPrices.bungalo;
    } else if (window.data.noticeType.value === window.data.types[1]) {
      window.data.noticePrice.min = typeMinPrices.house;
    } else if (window.data.noticeType.value === window.data.types[3]) {
      window.data.noticePrice.min = typeMinPrices.palace;
    }
  };
  var titleClickHandler = function (evt) {
    if (!evt.invalid) {
      window.data.noticeTitle.classList.remove('bordered');
    }
  };
  var capacityClickHandler = function (evt) {
    if (!evt.invalid) {
      window.data.noticeCapacity.classList.remove('bordered');
    }
  };
  var timeInClickHandler = function () {
    window.data.noticeTimeOut.value = window.data.noticeTimeIn.value;
    window.data.noticeTimeIn.title = 'Обратите внимание: при изменении времени заезда меняется время выезда и наоборот';
  };
  var timeOutClickHandler = function () {
    window.data.noticeTimeIn.value = window.data.noticeTimeOut.value;
    window.data.noticeTimeOut.title = 'Обратите внимание: при изменении времени выезда меняется время заезда и наоборот';
  };
  var submitInvalidClickHandler = function () {
    roomsCapacityClickHandler();
    var invalidCollection = document.querySelectorAll('input:invalid, select:invalid');
    for (var i = 0; i < invalidCollection.length; i++) {
      invalidCollection[i].classList.add('bordered');
    }
  };
  var resetClickHandler = function () {
    if (document.querySelector('.map__card')) {
      window.utilities.removeCardElement();
    }
    var pinsCollection = window.data.mapElement.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < pinsCollection.length; i++) {
      document.querySelector('.map__pins').removeChild(pinsCollection[i]);
    }
    window.utilities.disableNoticeForm();
    window.data.noticeAddress.value = (window.data.pinMain.offsetLeft + 50 / 2) + ', ' + (window.data.pinMain.offsetTop + (70 + 22) / 2);
    window.data.pinMain.style = '';
  };
  var resetKeypressHandler = function (evt) {
    if (evt.keycode === window.data.ENTER_KEYCODE) {
      resetClickHandler();
    }
  };
  window.data.noticeSubmitBtn.addEventListener('click', submitInvalidClickHandler);
  window.data.noticeCapacity.addEventListener('click', capacityClickHandler);
  window.data.noticeTitle.addEventListener('click', titleClickHandler);
  window.data.noticePrice.addEventListener('click', priceClickHandler);
  window.data.noticeTimeIn.addEventListener('click', timeInClickHandler);
  window.data.noticeTimeOut.addEventListener('click', timeOutClickHandler);
  window.data.noticeCapacity.addEventListener('click', roomsCapacityClickHandler);
  window.data.noticeRoomNumber.addEventListener('click', roomsCapacityClickHandler);
  window.data.noticeReset.addEventListener('click', resetClickHandler);
  window.data.noticeReset.addEventListener('keypress', resetKeypressHandler);
})();
