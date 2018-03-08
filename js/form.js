// модуль описывает поведение формы notice__time

'use strict';

(function () {

  window.utilities.disableNoticeForm();

  var manageInvalidity = function (evt) {
    if (!evt.invalid) {
      evt.target.classList.remove('bordered');
    }
  };

  var titleChangeHandler = function (evt) {
    manageInvalidity(evt);
  };

  var capacityChangeHandler = function (evt) {
    manageInvalidity(evt);
    window.data.notice.capacityElement.setCustomValidity('');
  };

  var removeBorder = function () {
    var invalidFields = document.querySelectorAll('input:invalid, select:invalid');
    for (var i = 0; i < invalidFields.length; i++) {
      invalidFields[i].classList.remove('bordered');
    }
  };

  var setTypeAndPriceCorrelation = function () {
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
    }
  };

  var typeChangeHandler = function () {
    setTypeAndPriceCorrelation();
  };

  var priceChangeHandler = function (evt) {
    setTypeAndPriceCorrelation();
    manageInvalidity(evt);
  };

  var timeInChangeHandler = function () {
    window.data.notice.timeOutElement.value = window.data.notice.timeInElement.value;
    window.data.notice.timeInElement.title = 'При изменении времени ЗАЕЗДА меняется время выезда и наоборот';
  };

  var timeOutChangeHandler = function () {
    window.data.notice.timeInElement.value = window.data.notice.timeOutElement.value;
    window.data.notice.timeOutElement.title = 'При изменении времени ВЫЕЗДА меняется время заезда и наоборот';
  };

  var resetClickHandler = function (evt) {
    evt.preventDefault();
    removeBorder();
    window.utilities.disableNoticeForm();
  };

  window.data.notice.submitButtonElement.addEventListener('click', window.utilities.submitInvalidClickHandler);
  window.data.notice.capacityElement.addEventListener('change', capacityChangeHandler);
  window.data.notice.titleElement.addEventListener('change', titleChangeHandler);
  window.data.notice.priceElement.addEventListener('change', priceChangeHandler);
  window.data.notice.typeElement.addEventListener('change', typeChangeHandler);
  window.data.notice.timeInElement.addEventListener('change', timeInChangeHandler);
  window.data.notice.timeOutElement.addEventListener('change', timeOutChangeHandler);
  window.data.notice.resetElement.addEventListener('click', resetClickHandler);
  window.data.notice.formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.send(new FormData(window.data.notice.formElement), window.utilities.successSendHandler, window.utilities.errorSendHandler);
  });
})();
