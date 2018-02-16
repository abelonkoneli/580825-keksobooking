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
// функция для проверки типа жилья. Со switch(proposals[i].offer.title[j]) не срабатывает:
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
// функция для определения случайного целого числа из диапазона min - max:
var getRandomQuantity = function (max, min) {
  return (Math.round(Math.random() * (max - min) + min));
};
  // функция для рандомной сортировки массивов исходных данных:
var sortArray = function (arr) {
  var index;
  for (var i = 0; i <= arr.length - 1; i++) {
    index = Math.floor(Math.random() * (arr.length - i));
    arr.push(arr[index]);
    arr.splice(index, 1);
  }
  return arr;
};
// функция для создания массива proposals из 8 елементов:
var createArray = function () {
  sortArray(titles);
  for (var i = 0; i <= 7; i++) {
    sortArray(photosArr);
    var featuresArr = [];
    // цикл для создания массива features рандомной длины с сохранением порядка элементов:
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
        photos: photosArr.slice(0, 3)// если просто присвоить перетасованный массив photosArr, без slice, в массив photos всех объекты попадает последняя версия тасования, т.е. он одинаков для всех объектов, тогда как в задании написано, что фото должны идти в произвольном порядке
      },
      location: {
        x: getRandomQuantity(900, 300),
        y: getRandomQuantity(500, 150)
      }
    };
    proposals[i].offer.address = proposals[i].location.x + ', ' + proposals[i].location.y;// обращение к location.x, location.y в момент присвоения значения offer.address не срабатывает, поэтому отдельной строчкой
  } return proposals;
};
createArray();
// выбор родительского узла для вставки основного фрагмента и удаление у него класса map__faded:
var mapElement = document.querySelector('.map');
mapElement.classList.remove('map--faded');
// клонирование и заполнение элемента-кнопки:
var pointerElement = document.querySelector('button.map__pin').cloneNode(true);
pointerElement.style.left = (proposals[0].location.x - 20);
pointerElement.style.top = (proposals[0].location.y - 40);

pointerElement.querySelector('img').setAttribute('src', proposals[0].author.avatar);
pointerElement.querySelector('img').setAttribute('width', '40');
pointerElement.querySelector('img').setAttribute('height', '40');
pointerElement.querySelector('img').setAttribute('draggable', 'false');
// создание фрагмента и вставка его в map__pin:
var fragment = document.createDocumentFragment();
fragment.appendChild(pointerElement);
var buttonLocation = document.querySelector('.map__pins');
buttonLocation.appendChild(fragment);
// клонирование и заполнение элемента-карты
var newElement = document.querySelector('template, article, .map__card').cloneNode(true).content;
newElement.querySelector('img').setAttribute('src', proposals[0].author.avatar);
newElement.querySelector('h3').textContent = proposals[0].offer.title;
newElement.querySelector('p:first-of-type').textContent = proposals[0].offer.address;
newElement.querySelector('p:nth-of-type(2n)').innerHTML = proposals[0].offer.price + ' &#x20bd;/ночь';
newElement.querySelector('h4').textContent = proposals[0].offer.type;
newElement.querySelector('p:nth-of-type(3n)').textContent = proposals[0].offer.rooms + ' комнаты для ' + proposals[0].offer.guests + ' гостей';
newElement.querySelector('p:nth-of-type(4n)').textContent = 'Заезд после ' + proposals[0].offer.checkin + ', ' + 'выезд до ' + proposals[0].offer.checkout;
// удаление коллекции features и вставка обратно присутствующих в данном объекте фич)
var features = newElement.querySelector('.popup__features');
var featuresColl = newElement.querySelectorAll('.feature');
features.removeChild(featuresColl[0]);
features.removeChild(featuresColl[1]);
features.removeChild(featuresColl[2]);
features.removeChild(featuresColl[3]);
features.removeChild(featuresColl[4]);
features.removeChild(featuresColl[5]);
for (var j = 0; j <= proposals[0].offer.features.length - 1; j++) {
  switch (proposals[0].offer.features[j]) {
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
newElement.querySelector('p:nth-of-type(5n)').textContent = proposals[0].offer.description;
// клонирование элементов для вставки фото:
var photosContainer = newElement.querySelector('.popup__pictures');
for (var n = 1; n <= proposals[0].offer.photos.length; n++) {
  var itemPhoto = photosContainer.querySelector('img').cloneNode(true);
  itemPhoto.setAttribute('src', proposals[0].offer.photos[n - 1]);
  itemPhoto.setAttribute('width', '60');
  itemPhoto.setAttribute('height', '60');
  photosContainer.appendChild(itemPhoto);
}
// создание фрагмента для вставки в map__card:
var mainFragment = document.createDocumentFragment();
mainFragment.appendChild(newElement);
// вставка фрагмента в разметку:
var nextSibling = mapElement.querySelector('.map__filters-container');
mapElement.insertBefore(mainFragment, nextSibling);
