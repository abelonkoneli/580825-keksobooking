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
var checkType = function (key) {
  for (var i = 0; i <= 7; i++) {
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
  for (var i = 0; i <= 7; i++) {
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
        price: getRandomQuantity(1000000, 1000),
        type: checkType(titles[i]),
        rooms: getRandomQuantity(5, 1),
        guests: getRandomQuantity(10, 2),
        checkin: time = getRandomQuantity(14, 12) + ':00',
        checkout: time,
        features: featuresArr,
        description: '',
        photos: photosArr.slice(0, 3)
      },
      location: {
        x: getRandomQuantity(900, 300),
        y: getRandomQuantity(500, 150)
      }
    };
    proposals[i].offer.address = proposals[i].location.x + ', ' + proposals[i].location.y;
  } return proposals;
};
createArray();
var mapElement = document.querySelector('.map');
mapElement.classList.remove('map--faded');
var insertButton = function () {
  for (var i = 0; i < proposals.length; i++) {
    var pointerElement = document.querySelector('button.map__pin').cloneNode(true);
    pointerElement.querySelector('img').setAttribute('src', proposals[i].author.avatar);
    pointerElement.style.left = (proposals[i].location.x - 20) + 'px';
    pointerElement.style.top = (proposals[i].location.y - 40) + 'px';
    pointerElement.querySelector('img').setAttribute('width', '40');
    pointerElement.querySelector('img').setAttribute('height', '40');
    pointerElement.querySelector('img').setAttribute('draggable', 'false');
    var fragment = document.createDocumentFragment();
    fragment.appendChild(pointerElement);
    var buttonLocation = document.querySelector('.map__pins');
    buttonLocation.appendChild(fragment);
  }
  return buttonLocation;
};
insertButton();

var insertCard = function (i) {
  var newElement = document.querySelector('template, article, .map__card').cloneNode(true).content;
  newElement.querySelector('h3').textContent = proposals[i].offer.title;
  newElement.querySelector('p:first-of-type').textContent = proposals[i].offer.address;
  newElement.querySelector('p:nth-of-type(2n)').innerHTML = proposals[i].offer.price + ' &#x20bd;/ночь';
  if (proposals[i].offer.type === 'flat') {
    newElement.querySelector('h4').textContent = 'Квартира';
  } else if (proposals[i].offer.type === 'house') {
    newElement.querySelector('h4').textContent = 'Дом';
  } else {
    newElement.querySelector('h4').textContent = 'Бунгало';
  }
  newElement.querySelector('p:nth-of-type(3n)').textContent = proposals[i].offer.rooms + ' комнаты для ' + proposals[i].offer.guests + ' гостей';
  newElement.querySelector('p:nth-of-type(4n)').textContent = 'Заезд после ' + proposals[i].offer.checkin + ', ' + 'выезд до ' + proposals[i].offer.checkout;
  var features = newElement.querySelector('.popup__features');
  var featuresColl = newElement.querySelectorAll('.feature');
  features.removeChild(featuresColl[0]);
  features.removeChild(featuresColl[1]);
  features.removeChild(featuresColl[2]);
  features.removeChild(featuresColl[3]);
  features.removeChild(featuresColl[4]);
  features.removeChild(featuresColl[5]);
  for (var j = 0; j <= proposals[i].offer.features.length - 1; j++) {
    switch (proposals[i].offer.features[j]) {
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
  newElement.querySelector('p:nth-of-type(5n)').textContent = proposals[i].offer.description;
  var photosContainer = newElement.querySelector('.popup__pictures');
  for (var n = 1; n <= proposals[i].offer.photos.length; n++) {
    var itemPhoto = photosContainer.querySelector('img').cloneNode(true);
    itemPhoto.setAttribute('src', proposals[i].offer.photos[n - 1]);
    itemPhoto.setAttribute('width', '60');
    itemPhoto.setAttribute('height', '60');
    photosContainer.appendChild(itemPhoto);
  }
  var mainFragment = document.createDocumentFragment();
  mainFragment.appendChild(newElement);
  var nextSibling = mapElement.querySelector('.map__filters-container');
  mapElement.insertBefore(mainFragment, nextSibling);
};
insertCard(0);
