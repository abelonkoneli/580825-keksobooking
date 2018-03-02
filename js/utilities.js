// модуль экспортирует служебные функции
'use strict';

(function () {
  var pinMainProps = {
    WIDTH: 65,
    HEIGHT: 65,
    AFTER_HEIGHT: 22,
    Z_INDEX: 999
  };
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;

  window.utilities = {
    checkType: function (key) {
      for (var i = 0; i < window.data.titles.length; i++) {
        if (key === 'Большая уютная квартира' || key === 'Маленькая неуютная квартира') {
          window.data.type = 'flat';
        } else if (key === 'Огромный прекрасный дворец' || key === 'Маленький ужасный дворец' || key === 'Красивый гостевой домик' || key === 'Некрасивый негостеприимный домик') {
          window.data.type = 'house';
        } else {
          window.data.type = 'bungalo';
        }
      } return window.data.type;
    },

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
      if (window.data.noticeForm.classList.contains('notice__form--disabled')) {
        window.data.noticeForm.classList.remove('notice__form--disabled');
        if (window.data.mapElement.classList.contains('map--faded')) {
          window.data.mapElement.classList.remove('map--faded');
        }
        window.data.noticeAddress.value = ((window.data.pinMain.offsetLeft + pinMainProps.WIDTH / 2) + ', ' + (window.data.pinMain.offsetTop + pinMainProps.HEIGHT + pinMainProps.AFTER_HEIGHT));
        window.data.pinMain.style.zIndex = pinMainProps.Z_INDEX;
        for (var i = 0; i < window.data.noticeCollection.length; i++) {
          window.data.noticeCollection[i].removeAttribute('disabled');
        }
        window.data.noticeSubmitBtn.removeAttribute('disabled');
        window.data.noticeAddress.setAttribute('readonly', true);
        // window.insertButtons();
        window.backend.load(window.utilities.successLoadHandler, window.utilities.errorLoadHandler);
      }
    },
    successLoadHandler: function (data) {
      window.optionalOffers = data;
      window.insertButtons(data);
    },

    errorLoadHandler: function (errorMessage) {
      var errorLoadAlert = document.createElement('div');
      errorLoadAlert.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      errorLoadAlert.style.position = 'absolute';
      errorLoadAlert.style.left = 0;
      errorLoadAlert.style.right = 0;
      errorLoadAlert.style.fontSize = '30px';

      errorLoadAlert.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', errorLoadAlert);
    },

    disableNoticeForm: function () {
      window.data.noticeAddress.value = (window.data.pinMain.offsetLeft + pinMainProps.WIDTH / 2) + ', ' + (window.data.pinMain.offsetTop + (pinMainProps.HEIGHT + pinMainProps.AFTER_HEIGHT) / 2);
      for (var i = 0; i < window.data.noticeCollection.length; i++) {
        window.data.noticeCollection[i].setAttribute('disabled', true);
      }
      document.querySelector('.form__element--submit').removeAttribute('disabled');
      document.querySelector('.form__submit').setAttribute('disabled', true);
      window.data.noticeForm.classList.add('notice__form--disabled');
      if (!window.data.mapElement.classList.contains('map--faded')) {
        window.data.mapElement.classList.add('map--faded');
      }
    },

    removeCardElement: function () {
      window.data.mapElement.removeChild(window.data.mapElement.querySelector('.map__card'));
      document.removeEventListener('keydown', window.utilities.cardEscKeydownHandler);
    },

    cardEscKeydownHandler: function (evt) {
      if (evt.keyCode === window.data.ESC_KEYCODE) {
        window.utilities.removeCardElement();
      }
    },
    successSendHandler: function () {
      window.utilities.disableNoticeForm();
      var pinsCollection = window.data.mapElement.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var i = 0; i < pinsCollection.length; i++) {
        document.querySelector('.map__pins').removeChild(pinsCollection[i]);
      }
      window.data.noticeAddress.value = (window.data.pinMain.offsetLeft + 50 / 2) + ', ' + (window.data.pinMain.offsetTop + (70 + 22) / 2);
      window.data.pinMain.style = '';
      window.data.noticeTitle.value = '';
      window.data.noticePrice.value = '';
      window.data.noticeForm.querySelector('#description').value = '';
      var checkboxes = window.data.noticeForm.querySelectorAll('input[type = "checkbox"]');
      for (var n = 0; n < checkboxes.length; n++) {
        checkboxes[n].checked = false;
      }
      var selects = window.data.noticeForm.querySelectorAll('select');
      for (var j = 0; j < selects.length; j++) {
        selects[j].selectedIndex = 0;
      }
    },

    errorSendHandler: function (errorMessage) {
      window.utilities.disableNoticeForm();
      var pinsCollection = window.data.mapElement.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var i = 0; i < pinsCollection.length; i++) {
        document.querySelector('.map__pins').removeChild(pinsCollection[i]);
      }
      window.data.noticeAddress.value = (window.data.pinMain.offsetLeft + 50 / 2) + ', ' + (window.data.pinMain.offsetTop + (70 + 22) / 2);
      window.data.pinMain.style = '';
      window.data.noticeTitle.value = '';
      window.data.noticePrice.value = '';
      window.data.noticeForm.querySelector('#description').value = '';
      var checkboxes = window.data.noticeForm.querySelectorAll('input[type = "checkbox"]');
      for (var n = 0; n < checkboxes.length; n++) {
        checkboxes[n].checked = false;
      }
      var selects = window.data.noticeForm.querySelectorAll('select');
      for (var j = 0; j < selects.length; j++) {
        selects[j].selectedIndex = 0;
      }
      var errorSendAlert = document.createElement('div');
      errorSendAlert.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      errorSendAlert.style.position = 'absolute';
      errorSendAlert.style.left = 0;
      errorSendAlert.style.right = 0;
      errorSendAlert.style.fontSize = '30px';

      errorSendAlert.textContent = errorMessage;
      window.data.noticeForm.insertAdjacentElement('afterbegin', errorSendAlert);
    },
    debounce: function (fnc) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(fnc, DEBOUNCE_INTERVAL);
    }
  };
})();
