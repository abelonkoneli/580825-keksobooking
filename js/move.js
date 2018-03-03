'use strict';

(function () {
  var MAX_X = activeArea.clientWidth;
  var MAX_Y = 500;
  var MIN_X = 0;
  var MIN_Y = 150;
  var activeArea = document.querySelector('.map__pins');
  var startX;
  var startY;
  var shiftX;
  var shiftY;

  window.utilities.disableNoticeForm();
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
    document.addEventListener('mousemove', documentMousemoveHandler);
    document.addEventListener('mouseup', documentMouseupHandler);
  };
  var documentMousemoveHandler = function (evt) {
    movePinMain(evt.clientX, evt.clientY);
  };
  var documentMouseupHandler = function () {
    document.removeEventListener('mousemove', documentMousemoveHandler);
    document.removeEventListener('mouseup', documentMouseupHandler);
    if (window.data.Notice.formElement.classList.contains('notice__form--disabled')) {
      window.utilities.enableNoticeForm();
    }
    window.data.Notice.addressElement.value = shiftX + ', ' + shiftY;
  };
  window.data.pinMainElement.addEventListener('mousedown', pinMainMousedownHandler);

})();
