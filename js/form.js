// модуль описывает поведение формы notice__time

'use strict';

(function () {

  window.utilities.disableNoticeForm();

  var manageInvalidity = function (evt) {
    if (!evt.invalid) {
      evt.target.classList.remove('bordered');
    }
  };

  var titleClickHandler = function (evt) {
    manageInvalidity(evt);
  };

  var capacityClickHandler = function (evt) {
    manageInvalidity(evt);
  };
  var guestsQuantity = {
    MAX: 100,
    MIN: 0
  };

  var removeBorder = function () {
    var invalidFields = document.querySelectorAll('input:invalid, select:invalid');
    for (var i = 0; i < invalidFields.length; i++) {
      invalidFields[i].classList.remove('bordered');
    }
  };

  var roomsCapacityClickHandler = function () {
    if (+window.data.notice.roomNumberElement.value < +window.data.notice.capacityElement.value) {
      window.data.notice.capacityElement.setCustomValidity('Гостей не может быть больше, чем комнат');
    } else if (+window.data.notice.roomNumberElement.value === guestsQuantity.MAX && +window.data.notice.capacityElement.value !== guestsQuantity.MIN) {
      window.data.notice.capacityElement.setCustomValidity('Сто комнат не рассчитаны на гостей');
    } else if (+window.data.notice.roomNumberElement.value !== guestsQuantity.MAX && +window.data.notice.capacityElement.value === guestsQuantity.MIN) {
      window.data.notice.capacityElement.setCustomValidity('Гостей не может быть меньше одного');
    } else {
      window.data.notice.capacityElement.setCustomValidity('');
    }
  };

  var typePriceClickHandler = function (evt) {
    var typeMinPrices = [
      {
        type: 'bungalo',
        price: '0'
      },
      {
        type: 'flat',
        price: '1000'
      },
      {
        type: 'house',
        price: '5000'
      },
      {
        type: 'palace',
        price: '10000'
      }
    ];

    if (window.data.notice.typeElement.value === typeMinPrices[1].type) {
      window.data.notice.priceElement.min = typeMinPrices[1].price;
    } else if (window.data.notice.typeElement.value === typeMinPrices[2].type) {
      window.data.notice.priceElement.min = typeMinPrices[2].price;
    } else if (window.data.notice.typeElement.value === typeMinPrices[3].type) {
      window.data.notice.priceElement.min = typeMinPrices[3].price;
    } else {
      window.data.notice.priceElement.min = typeMinPrices[0].price;
    }
    manageInvalidity(evt);
  };

  var timeInClickHandler = function () {
    window.data.notice.timeOutElement.value = window.data.notice.timeInElement.value;
    window.data.notice.timeInElement.title = 'При изменении времени ЗАЕЗДА меняется время выезда и наоборот';
  };

  var timeOutClickHandler = function () {
    window.data.notice.timeInElement.value = window.data.notice.timeOutElement.value;
    window.data.notice.timeOutElement.title = 'При изменении времени ВЫЕЗДА меняется время заезда и наоборот';
  };

  var submitInvalidClickHandler = function () {
    roomsCapacityClickHandler();
    var invalidFields = document.querySelectorAll('input:invalid, select:invalid');
    for (var i = 0; i < invalidFields.length; i++) {
      invalidFields[i].classList.add('bordered');
    }
  };

  var resetClickHandler = function (evt) {
    evt.preventDefault();
    removeBorder();
    window.utilities.disableNoticeForm();
  };

  var resetKeypressHandler = function (evt) {
    if (evt.keycode === window.data.keycode.ENTER) {
      resetClickHandler();
    }
  };

  window.data.notice.submitButtonElement.addEventListener('click', submitInvalidClickHandler);
  window.data.notice.capacityElement.addEventListener('click', capacityClickHandler);
  window.data.notice.capacityElement.addEventListener('click', roomsCapacityClickHandler);
  window.data.notice.roomNumberElement.addEventListener('click', roomsCapacityClickHandler);
  window.data.notice.titleElement.addEventListener('click', titleClickHandler);
  window.data.notice.priceElement.addEventListener('click', typePriceClickHandler);
  window.data.notice.typeElement.addEventListener('click', typePriceClickHandler);
  window.data.notice.timeInElement.addEventListener('click', timeInClickHandler);
  window.data.notice.timeOutElement.addEventListener('click', timeOutClickHandler);
  window.data.notice.resetElement.addEventListener('click', resetClickHandler);
  window.data.notice.resetElement.addEventListener('keypress', resetKeypressHandler);
  window.data.notice.formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.send(new FormData(window.data.notice.formElement), window.utilities.successSendHandler, window.utilities.errorSendHandler);
  });
})();
