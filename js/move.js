'use strict';

(function () {
  var MAX_X = document.querySelector('.map__pins').clientWidth;
  var MAX_Y = 500;
  var MIN_X = 0;
  var MIN_Y = 150;
  var startX;
  var startY;
  var shiftX;
  var shiftY;

  var resetData = function (x, y) {
    shiftX = window.data.pinMainElement.offsetLeft;
    shiftY = window.data.pinMainElement.offsetTop;
    startX = x;
    startY = y;
  };
  var movePinMain = function (x, y) {
    var moveX = x - startX;
    var moveY = y - startY;
    var currentX = shiftX + moveX;
    var currentY = shiftY + moveY;
    if (currentX <= MAX_X && currentX >= MIN_X) {
      shiftX = currentX;
      window.data.pinMainElement.style.left = shiftX + 'px';
      startX = x;
    }
    if (currentY <= MAX_Y && currentY >= MIN_Y) {
      shiftY = currentY;
      window.data.pinMainElement.style.top = shiftY + 'px';
      startY = y;
    }
  };
  var pinMainMousedownHandler = function (evt) {
    resetData(evt.clientX, evt.clientY);
    if (window.data.mapElement.contains(document.querySelector('.map__card'))) {
      window.utilities.removeCardElementHandler();
    }
    document.addEventListener('mousemove', documentMousemoveHandler);
    document.addEventListener('mouseup', documentMouseupHandler);
  };
  var documentMousemoveHandler = function (evt) {
    movePinMain(evt.clientX, evt.clientY);
  };
  var documentMouseupHandler = function () {
    document.removeEventListener('mousemove', documentMousemoveHandler);
    document.removeEventListener('mouseup', documentMouseupHandler);
    if (window.data.notice.formElement.classList.contains('notice__form--disabled')) {
      window.utilities.enableNoticeFormHandler();
    }
    window.data.notice.addressElement.value = window.data.pinMainElement.offsetLeft + ', ' + window.data.pinMainElement.offsetTop;
  };
  window.data.pinMainElement.addEventListener('mousedown', pinMainMousedownHandler);

})();
