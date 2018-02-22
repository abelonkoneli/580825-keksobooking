'use strict';

var proposals = [];

var titles = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var featuresArrCopy = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var photosArr = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var type;
var time;
var mapElement = document.querySelector('.map');
var buttonTemplate = document.querySelector('template').content.querySelector('.map__pin');
var cardElementTemplate = document.querySelector('template').content.querySelector('.map__card');
var pinMain = document.querySelector('.map__pin--main');
var noticeAddress = document.querySelector('#address');
var ESC_KEYCODE = 27;
var PRICE_MAX = 1000000;
var PRICE_MIN = 1000;
var ROOMS_MAX = 5;
var ROOMS_MIN = 1;
var GUESTS_MAX = 10;
var GUESTS_MIN = 2;
var TIME_MAX = 14;
var TIME_MIN = 12;
var X_MAX = 900;
var X_MIN = 300;
var Y_MAX = 500;
var Y_MIN = 150;
var PIN_MAIN_WIDTH = 65;
var PIN_MAIN_HEIGHT = 65;
var PIN_MAIN_AFTER_HEIGHT = 22;
var PIN_MAIN_Z_INDEX = 9999;

var checkType = function (key) {
  for (var i = 0; i < titles.length; i++) {
    if (key === 'Большая уютная квартира' || key === 'Маленькая неуютная квартира') {
      type = 'flat';
    } else if (key === 'Огромный прекрасный дворец' || key === 'Маленький ужасный дворец' || key === 'Красивый гостевой домик' || key === 'Некрасивый негостеприимный домик') {
      type = 'house';
    } else {
      type = 'bungalo';
    }
  } return type;
};

var getRandomQuantity = function (max, min) {
  return (Math.round(Math.random() * (max - min) + min));
};

var sortArray = function (arr) {
  var index;
  for (var i = 0; i <= arr.length - 1; i++) {
    index = Math.floor(Math.random() * (arr.length - i));
    arr.push(arr[index]);
    arr.splice(index, 1);
  }
  return arr;
};

var createArray = function () {
  sortArray(titles);
  for (var i = 0; i < titles.length; i++) {
    sortArray(photosArr);
    var featuresArr = [];
    for (var j = 0; j <= featuresArrCopy.length - 1; j++) {
      if (getRandomQuantity(1, 0)) {
        featuresArr.push(featuresArrCopy[j]);
      }
    }
    proposals[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: titles[i],
        address: '',
        price: getRandomQuantity(PRICE_MAX, PRICE_MIN),
        type: checkType(titles[i]),
        rooms: getRandomQuantity(ROOMS_MAX, ROOMS_MIN),
        guests: getRandomQuantity(GUESTS_MAX, GUESTS_MIN),
        checkin: time = getRandomQuantity(TIME_MAX, TIME_MIN) + ':00',
        checkout: time,
        features: featuresArr,
        description: '',
        photos: photosArr.slice(0, photosArr.length)
      },
      location: {
        x: getRandomQuantity(X_MAX, X_MIN),
        y: getRandomQuantity(Y_MAX, Y_MIN)
      }
    };
    proposals[i].offer.address = proposals[i].location.x + ', ' + proposals[i].location.y;
  } return proposals;
};
createArray();

var createButtonElement = function (prop) {
  var buttonElement = buttonTemplate.cloneNode(true);
  buttonElement.style.left = (prop.location.x + 20) + 'px';
  buttonElement.style.top = (prop.location.y + 40) + 'px';
  buttonElement.querySelector('img').setAttribute('src', prop.author.avatar);
  buttonElement.querySelector('img').setAttribute('width', '40');
  buttonElement.querySelector('img').setAttribute('height', '40');
  buttonElement.querySelector('img').setAttribute('draggable', 'false');
  return buttonElement;
};

var createCardElement = function (prop) {
  var cardElement = cardElementTemplate.cloneNode(true);
  cardElement.querySelector('h3').textContent = prop.offer.title;
  cardElement.querySelector('p:first-of-type').textContent = prop.offer.address;
  cardElement.querySelector('p:nth-of-type(2n)').innerHTML = prop.offer.price + ' &#x20bd;/ночь';
  if (prop.offer.type === 'flat') {
    cardElement.querySelector('h4').textContent = 'Квартира';
  } else if (prop.offer.type === 'house') {
    cardElement.querySelector('h4').textContent = 'Дом';
  } else {
    cardElement.querySelector('h4').textContent = 'Бунгало';
  }
  cardElement.querySelector('p:nth-of-type(3n)').textContent = prop.offer.rooms + ' комнаты для ' + prop.offer.guests + ' гостей';
  cardElement.querySelector('p:nth-of-type(4n)').textContent = 'Заезд после ' + prop.offer.checkin + ', ' + 'выезд до ' + prop.offer.checkout;
  var features = cardElement.querySelector('.popup__features');
  var featuresColl = cardElement.querySelectorAll('.feature');
  features.removeChild(featuresColl[0]);
  features.removeChild(featuresColl[1]);
  features.removeChild(featuresColl[2]);
  features.removeChild(featuresColl[3]);
  features.removeChild(featuresColl[4]);
  features.removeChild(featuresColl[5]);
  for (var j = 0; j <= prop.offer.features.length - 1; j++) {
    switch (prop.offer.features[j]) {
      case 'wifi':
        features.appendChild(featuresColl[0]);
        break;
      case 'dishwasher':
        features.appendChild(featuresColl[1]);
        break;
      case 'parking':
        features.appendChild(featuresColl[2]);
        break;
      case 'washer':
        features.appendChild(featuresColl[3]);
        break;
      case 'elevator':
        features.appendChild(featuresColl[4]);
        break;
      case 'conditioner':
        features.appendChild(featuresColl[5]);
        break;
    }
  }
  cardElement.querySelector('p:nth-of-type(5n)').textContent = prop.offer.description;
  var photosContainer = cardElement.querySelector('.popup__pictures');
  for (var n = 1; n <= prop.offer.photos.length; n++) {
    var itemPhoto = photosContainer.querySelector('img').cloneNode(true);
    itemPhoto.setAttribute('src', prop.offer.photos[n - 1]);
    itemPhoto.setAttribute('width', '60');
    itemPhoto.setAttribute('height', '60');
    photosContainer.appendChild(itemPhoto);
  }
  cardElement.querySelector('img.popup__avatar').setAttribute('src', prop.author.avatar);
  return cardElement;
};

var cardEscKeydownHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    removeCardElement();
  }
};

var removeCardElement = function () {
  mapElement.removeChild(mapElement.querySelector('.map__card'));
  document.removeEventListener('keydown', cardEscKeydownHandler);
};

var insertCardElement = function (prop) {
  if (mapElement.querySelector('.map__card')) {
    removeCardElement();
  }
  mapElement.insertBefore(createCardElement(prop), mapElement.querySelector('.map__filters-container'));
  document.addEventListener('keydown', cardEscKeydownHandler);
  var cardCloseElement = mapElement.querySelector('.map__card, .popup__close');
  cardCloseElement.addEventListener('click', function () {
    removeCardElement();
  });
};

var buttonClickHandlerOuter = function (btn, prop) {
  var buttonPinClickHandlerInner = function () {
    insertCardElement(prop);
  };
  return btn.addEventListener('click', buttonPinClickHandlerInner);
};

var insertButtons = function () {
  var fragment = document.createDocumentFragment();
  var btn;
  for (var i = 0; i < proposals.length; i++) {
    btn = createButtonElement(proposals[i]);
    buttonClickHandlerOuter(btn, proposals[i]);
    fragment.appendChild(btn);
  }
  return document.querySelector('.map__pins').appendChild(fragment);
};

var noticeHeader = document.querySelector('.notice__header');
noticeHeader.setAttribute('disabled', true);
var noticeTitle = document.querySelector('#title');
noticeTitle.setAttribute('disabled', true);
noticeAddress.setAttribute('disabled', true);
var noticeType = document.querySelector('#type');
noticeType.setAttribute('disabled', true);
var noticePrice = document.querySelector('#price');
noticePrice.setAttribute('disabled', true);
var noticeTimeIn = document.querySelector('#timein');
noticeTimeIn.setAttribute('disabled', true);
var noticeTimeOut = document.querySelector('#timeout');
noticeTimeOut.setAttribute('disabled', true);
var noticeRoomNumber = document.querySelector('#room_number');
noticeRoomNumber.setAttribute('disabled', true);
var noticeCapacity = document.querySelector('#capacity');
noticeCapacity.setAttribute('disabled', true);
var noticeFeatures = document.querySelector('#features');
noticeFeatures.setAttribute('disabled', true);
var noticeDescription = document.querySelector('#description');
noticeDescription.setAttribute('disabled', true);
var noticeImages = document.querySelector('#images');
noticeImages.setAttribute('disabled', true);
var noticeSubmit = document.querySelector('.form__element--submit');
noticeSubmit.setAttribute('disabled', true);
noticeAddress.value = (pinMain.offsetLeft + PIN_MAIN_WIDTH / 2) + ', ' + (pinMain.offsetTop + (PIN_MAIN_HEIGHT + PIN_MAIN_AFTER_HEIGHT) / 2);
pinMain.style.zIndex = PIN_MAIN_Z_INDEX;

var pinMainInitMouseupHandler = function () {
  mapElement.classList.remove('map--faded');
  var noticeForm = document.querySelector('.notice__form');
  noticeForm.classList.remove('notice__form--disabled');
  noticeHeader.removeAttribute('disabled');
  noticeTitle.removeAttribute('disabled');
  noticeAddress.removeAttribute('disabled');
  noticeType.removeAttribute('disabled');
  noticePrice.removeAttribute('disabled');
  noticeTimeIn.removeAttribute('disabled');
  noticeTimeOut.removeAttribute('disabled');
  noticeRoomNumber.removeAttribute('disabled');
  noticeCapacity.removeAttribute('disabled');
  noticeFeatures.removeAttribute('disabled');
  noticeDescription.removeAttribute('disabled');
  noticeImages.removeAttribute('disabled');
  noticeSubmit.removeAttribute('disabled');
  insertButtons();
};

var pinMainAddressMouseupHandler = function () {
  noticeAddress.value = ((pinMain.offsetLeft + PIN_MAIN_WIDTH / 2) + ', ' + (pinMain.offsetTop + PIN_MAIN_HEIGHT + PIN_MAIN_AFTER_HEIGHT));
};

pinMain.addEventListener('mouseup', pinMainInitMouseupHandler);
pinMain.addEventListener('mouseup', pinMainAddressMouseupHandler);
