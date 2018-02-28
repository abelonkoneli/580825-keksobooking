// модуль экспортирует служебные функции
'use strict';

(function () {
  var pinMainProps = {
    WIDTH: 65,
    HEIGHT: 65,
    AFTER_HEIGHT: 22,
    Z_INDEX: 999
  };

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
        window.createArray();
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
        window.insertButtons();
      }
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
    }

  };
})();
