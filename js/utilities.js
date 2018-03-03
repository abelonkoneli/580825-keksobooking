// модуль экспортирует служебные функции
'use strict';

(function () {
  var PinMainValues = {
    WIDTH: 65,
    HEIGHT: 65,
    AFTER_HEIGHT: 22,
    Z_INDEX: 999
  };

  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;
  var ERROR_CLOSE_TIMEOUT = 1700;

  var resetFields = function (el) {
    var checkboxes = el.querySelectorAll('input[type = "checkbox"]');
    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
    var selects = el.querySelectorAll('select');
    for (i = 0; i < selects.length; i++) {
      selects[i].selectedIndex = 0;
    }
  };

  var updateNoticeFields = function () {
    window.data.pinMainElement.style = '';
    window.data.Notice.titleElement.value = '';
    window.data.Notice.priceElement.value = '';
    window.data.Notice.formElement.querySelector('#description').value = '';
    resetFields(window.data.Notice.formElement);
  };

  var stylizeError = function (el, errorMessage) {
    el.style = 'z-index: ' + PinMainValues.Z_INDEX + '; ' + 'margin: 0 auto; text-align: center; background-color: white;';
    el.style.position = 'fixed';
    el.style.left = '0';
    el.style.right = '0';
    el.style.top = '45%';
    el.style.bottom = '48%';
    el.style.fontSize = '30px';
    el.textContent = errorMessage;
    setTimeout(function () {
      el.style.display = 'none';
    },
    ERROR_CLOSE_TIMEOUT);
    return el;
  };

  window.utilities = {
    getRandomQuantity: function (max, min) {
      return (Math.round(Math.random() * (max - min) + min));
    },

    sortArray: function (arr) {
      var index;
      for (var i = 0; i <= arr.length - 1; i++) {
        index = Math.floor(Math.random() * (arr.length - i));
        arr.push(arr[index]);
        arr.splice(index, 1);
      }
      return arr;
    },

    enableNoticeForm: function () {
      if (window.data.Notice.formElement.classList.contains('notice__form--disabled')) {
        window.data.Notice.formElement.classList.remove('notice__form--disabled');
        if (window.data.mapElement.classList.contains('map--faded')) {
          window.data.mapElement.classList.remove('map--faded');
        }
        for (var i = 0; i < window.data.Notice.collection.length; i++) {
          window.data.Notice.collection[i].removeAttribute('disabled');
        }
        window.data.Notice.submitBtnElement.removeAttribute('disabled');
        window.data.Notice.addressElement.setAttribute('readonly', true);
        window.backend.load(window.utilities.successLoadHandler, window.utilities.errorLoadHandler);
        window.data.Notice.addressElement.value = ((window.data.pinMainElement.offsetLeft + PinMainValues.WIDTH / 2) + ', ' + (window.data.pinMainElement.offsetTop + PinMainValues.HEIGHT + PinMainValues.AFTER_HEIGHT));
        window.data.pinMainElement.style.zIndex = PinMainValues.Z_INDEX;
      }
    },

    disableNoticeForm: function () {
      window.utilities.removePinCollection();
      if (window.data.mapElement.contains(document.querySelector('.map__card'))) {
        window.utilities.removeCardElement();
      }
      updateNoticeFields();
      resetFields(window.data.mapFiltersElement);
      for (var i = 0; i < window.data.Notice.collection.length; i++) {
        window.data.Notice.collection[i].setAttribute('disabled', true);
      }
      window.data.Notice.submitBtnElement.setAttribute('disabled', true);
      window.data.Notice.formElement.classList.add('notice__form--disabled');
      document.querySelector('.form__element--submit').removeAttribute('disabled');
      window.data.mapElement.classList.add('map--faded');
      window.data.Notice.addressElement.value = (window.data.pinMainElement.offsetLeft + PinMainValues.WIDTH / 2) + ', ' + (window.data.pinMainElement.offsetTop + (PinMainValues.HEIGHT + PinMainValues.AFTER_HEIGHT) / 2);
    },

    removeCardElement: function () {
      window.data.mapElement.removeChild(window.data.mapElement.querySelector('.map__card'));
      document.removeEventListener('keydown', window.utilities.cardEscKeydownHandler);
    },

    cardEscKeydownHandler: function (evt) {
      if (evt.keyCode === window.data.Keycode.ESC) {
        window.utilities.removeCardElement();
      }
    },

    successLoadHandler: function (data) {
      window.optionalOffers = data;
      window.insertButtons(data);
    },

    errorLoadHandler: function (errorMessage) {
      var errorLoadAlert = document.createElement('div');
      stylizeError(errorLoadAlert, errorMessage);
      document.body.insertAdjacentElement('afterbegin', errorLoadAlert);
      window.utilities.disableNoticeForm();
    },

    successSendHandler: function () {
      window.utilities.disableNoticeForm();
    },

    errorSendHandler: function (errorMessage) {
      var errorSendAlert = document.createElement('div');
      stylizeError(errorSendAlert, errorMessage);
      window.data.Notice.formElement.insertAdjacentElement('afterend', errorSendAlert);
      window.utilities.disableNoticeForm();
    },

    removePinCollection: function () {
      var pinCollection = window.data.mapElement.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var i = 0; i < pinCollection.length; i++) {
        document.querySelector('.map__pins').removeChild(pinCollection[i]);
      }
    },

    debounce: function (cb) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
    }
  };
})();
