// модуль экспортирует служебные функции
'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var ERROR_CLOSE_TIMEOUT = 1700;
  var lastTimeout;

  var resetFields = function (element) {
    var checkboxes = element.querySelectorAll('input[type = "checkbox"]');
    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
    var selects = element.querySelectorAll('select');
    for (i = 0; i < selects.length; i++) {
      selects[i].selectedIndex = 0;
    }
  };

  var updateNoticeFields = function () {
    window.data.pinMainElement.style = '';
    window.data.notice.titleElement.value = '';
    window.data.notice.priceElement.value = '';
    window.data.notice.formElement.querySelector('#description').value = '';
    resetFields(window.data.notice.formElement);
  };

  var stylizeError = function (element, errorMessage) {
    element.style = 'z-index: ' + window.data.pinMainValues.Z_INDEX + '; ' + 'margin: 0 auto; text-align: center; background-color: white;';
    element.style.position = 'fixed';
    element.style.left = '0';
    element.style.right = '0';
    element.style.top = '45%';
    element.style.bottom = '48%';
    element.style.fontSize = '30px';
    element.textContent = errorMessage;
    setTimeout(function () {
      element.style.display = 'none';
    },
    ERROR_CLOSE_TIMEOUT);
    return element;
  };

  window.utilities = {
    sortArray: function (anyArray) {
      var index;
      for (var i = 0; i <= anyArray.length - 1; i++) {
        index = Math.floor(Math.random() * (anyArray.length - i));
        anyArray.push(anyArray[index]);
        anyArray.splice(index, 1);
      }
      return anyArray;
    },

    enableNoticeFormHandler: function () {
      if (window.data.notice.formElement.classList.contains('notice__form--disabled')) {
        window.data.notice.formElement.classList.remove('notice__form--disabled');
        if (window.data.mapElement.classList.contains('map--faded')) {
          window.data.mapElement.classList.remove('map--faded');
        }
        for (var i = 0; i < window.data.notice.fieldsets.length; i++) {
          window.data.notice.fieldsets[i].disabled = false;
        }
        window.data.notice.submitButtonElement.disabled = false;
        window.data.notice.addressElement.readOnly = true;
        window.data.notice.priceElement.min = 0;
        window.backend.load(window.utilities.successLoadHandler, window.utilities.errorLoadHandler);
        window.data.pinMainElement.style.zIndex = window.data.pinMainValues.Z_INDEX;
      }
    },

    disableNoticeForm: function () {
      window.utilities.removePins();
      if (window.data.mapElement.contains(document.querySelector('.map__card'))) {
        window.utilities.removeCardElementHandler();
      }
      updateNoticeFields();
      resetFields(window.data.mapFiltersElement);
      for (var i = 0; i < window.data.notice.fieldsets.length; i++) {
        window.data.notice.fieldsets[i].disabled = true;
      }
      window.data.notice.submitButtonElement.disabled = true;
      window.data.notice.formElement.classList.add('notice__form--disabled');
      document.querySelector('.form__element--submit').disabled = false;
      window.data.mapElement.classList.add('map--faded');
      window.data.notice.addressElement.value = (window.data.pinMainElement.offsetLeft + window.data.pinMainValues.WIDTH / 2) + ', ' + (window.data.pinMainElement.offsetTop + (window.data.pinMainValues.HEIGHT + window.data.pinMainValues.AFTER_HEIGHT) / 2);
      window.data.notice.submitButtonElement.removeEventListener('click', window.utilities.submitInvalidClickHandler);
    },

    removeCardElementHandler: function () {
      var cardCloseElement = window.data.mapElement.querySelector('.popup__close');
      cardCloseElement.removeEventListener('click', window.utilities.removeCardElementHandler);
      window.data.mapElement.removeChild(window.data.mapElement.querySelector('.map__card'));
      document.removeEventListener('keydown', window.utilities.cardEscKeydownHandler);
    },

    cardEscKeydownHandler: function (evt) {
      if (evt.keyCode === window.data.keycode.ESC) {
        window.utilities.removeCardElementHandler();
      }
    },

    submitInvalidClickHandler: function () {
      window.utilities.roomsCapacityClickHandler();
      var invalidFields = document.querySelectorAll('input:invalid, select:invalid');
      for (var i = 0; i < invalidFields.length; i++) {
        invalidFields[i].classList.add('bordered');
      }
    },
    roomsCapacityClickHandler: function () {
      var guestsQuantity = {
        MAX: 100,
        MIN: 0
      };
      if (+window.data.notice.roomNumberElement.value < +window.data.notice.capacityElement.value) {
        window.data.notice.capacityElement.setCustomValidity('Гостей не может быть больше, чем комнат');
      } else if (+window.data.notice.roomNumberElement.value === guestsQuantity.MAX && +window.data.notice.capacityElement.value !== guestsQuantity.MIN) {
        window.data.notice.capacityElement.setCustomValidity('Сто комнат не рассчитаны на гостей');
      } else if (+window.data.notice.roomNumberElement.value !== guestsQuantity.MAX && +window.data.notice.capacityElement.value === guestsQuantity.MIN) {
        window.data.notice.capacityElement.setCustomValidity('Гостей не может быть меньше одного');
      } else {
        window.data.notice.capacityElement.setCustomValidity('');
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
      window.data.notice.formElement.insertAdjacentElement('afterend', errorSendAlert);

    },

    removePins: function () {
      var pins = window.data.mapElement.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var i = 0; i < pins.length; i++) {
        document.querySelector('.map__pins').removeChild(pins[i]);
      }
    },

    debounce: function (x) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(x, DEBOUNCE_INTERVAL);
    }
  };
})();
