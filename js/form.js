// модуль описывает поведение формы notice__time

'use strict';

(function () {

  window.utilities.disableNoticeForm();

  var handleInvalidity = function (evt) {
    if (!evt.invalid) {
      evt.target.classList.remove('bordered');
    }
  };

  var titleClickHandler = function (evt) {
    handleInvalidity(evt);
  };

  var capacityClickHandler = function (evt) {
    handleInvalidity(evt);
  };

  var roomsCapacityClickHandler = function () {
    if (+window.data.Notice.roomNumberElement.value < +window.data.Notice.capacityElement.value) {
      window.data.Notice.capacityElement.setCustomValidity('Гостей не может быть больше, чем комнат');
    } else if (+window.data.Notice.roomNumberElement.value === '100' && +window.data.Notice.capacityElement.value !== '0') {
      window.data.Notice.capacityElement.setCustomValidity('Сто комнат не рассчитаны на гостей');
    } else if (+window.data.Notice.roomNumberElement.value !== '100' && +window.data.Notice.capacityElement.value === '0') {
      window.data.Notice.capacityElement.setCustomValidity('Гостей не может быть меньше одного');
    } else {
      window.data.Notice.capacityElement.setCustomValidity('');
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

    if (window.data.Notice.typeElement.value === typeMinPrices[1].type) {
      window.data.Notice.priceElement.min = typeMinPrices[1].price;
    } else if (window.data.Notice.typeElement.value === typeMinPrices[2].type) {
      window.data.Notice.priceElement.min = typeMinPrices[2].price;
    } else if (window.data.Notice.typeElement.value === typeMinPrices[3].type) {
      window.data.Notice.priceElement.min = typeMinPrices[3].price;
    } else {
      window.data.Notice.priceElement.min = typeMinPrices[0].price;
    }
    handleInvalidity(evt);
  };

  var timeInClickHandler = function () {
    window.data.Notice.timeOutElement.value = window.data.Notice.timeInElement.value;
    window.data.Notice.timeInElement.title = 'Обратите внимание: при изменении времени заезда меняется время выезда и наоборот';
  };

  var timeOutClickHandler = function () {
    window.data.Notice.timeInElement.value = window.data.Notice.timeOutElement.value;
    window.data.Notice.timeOutElement.title = 'Обратите внимание: при изменении времени выезда меняется время заезда и наоборот';
  };

  var submitInvalidClickHandler = function () {
    roomsCapacityClickHandler();
    var invalidCollection = document.querySelectorAll('input:invalid, select:invalid');
    for (var i = 0; i < invalidCollection.length; i++) {
      invalidCollection[i].classList.add('bordered');
    }
  };

  var resetClickHandler = function () {
    window.utilities.disableNoticeForm();
  };

  var resetKeypressHandler = function (evt) {
    if (evt.keycode === window.data.keycode.ENTER) {
      resetClickHandler();
    }
  };

  window.data.Notice.submitBtnElement.addEventListener('click', submitInvalidClickHandler);
  window.data.Notice.capacityElement.addEventListener('click', capacityClickHandler);
  window.data.Notice.capacityElement.addEventListener('click', roomsCapacityClickHandler);
  window.data.Notice.roomNumberElement.addEventListener('click', roomsCapacityClickHandler);
  window.data.Notice.titleElement.addEventListener('click', titleClickHandler);
  window.data.Notice.priceElement.addEventListener('click', typePriceClickHandler);
  window.data.Notice.typeElement.addEventListener('click', typePriceClickHandler);
  window.data.Notice.timeInElement.addEventListener('click', timeInClickHandler);
  window.data.Notice.timeOutElement.addEventListener('click', timeOutClickHandler);
  window.data.Notice.resetElement.addEventListener('click', resetClickHandler);
  window.data.Notice.resetElement.addEventListener('keypress', resetKeypressHandler);
  window.data.Notice.formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.send(new FormData(window.data.Notice.formElement), window.utilities.successSendHandler, window.utilities.errorSendHandler);
  });
})();
