'use strict';

(function () {
  var activeArea = document.querySelector('.map__pins');
  var maxX = activeArea.clientWidth;
  var maxY = 500;
  var minX = 0;
  var minY = 150;
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
    if (currentX <= maxX && currentX >= minX) {
      shiftX = currentX;
      window.data.pinMainElement.style.left = shiftX + 'px';
      startX = x;
    }
    if (currentY <= maxY && currentY >= minY) {
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
