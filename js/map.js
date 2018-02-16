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
// клонирование и заполнение элемента для вставки во фрагмент:
var pointerElement = document.querySelector('.map__pin').cloneNode(true);
var buttonElement = pointerElement.querySelector('button');
buttonElement.style.left = '' + (proposals[0].location.x - 20);
buttonElement.style.top = '' + (proposals[0].location.y - 40);
var imageElement = pointerElement.querySelector('img');
imageElement.setAttribute('src', 'proposals[0].author.avatar');
imageElement.setAttribute('width', '40');
imageElement.setAttribute('height', '40');
imageElement.setAttribute('draggable', 'false');
buttonElement.appendChild(imageElement);
// создание фрагмента и вставка его в map__pin:
var fragment = document.createDocumentFragment();
fragment.appendChild(buttonElement);
var locationButton = document.querySelector('.map__pin--main');
locationButton.appendChild(fragment);
// создание фрагмента для вставки в map__card:
var mainFragment = document.createDocumentFragment();
// клонирование и заполнение элемента для вставки во фрагмент:
var newElement = document.querySelector('.map__card').cloneNode(true);
newElement.querySelector('.popup__avatar').setAttribute('src', 'proposals[0].author.avatar');
newElement.querySelector('h3').textContent = proposals[0].offer.title;
newElement.querySelector('p:first-of-type').textContent = proposals[0].offer.address;
newElement.querySelector('.popup_price').textContent = proposals[0].offer.price + ' &#x20bd;/ночь';
newElement.querySelector('h4').textContent = proposals[0].offer.type;
newElement.querySelector('p:nth-of-type(3n)').textContent = proposals[0].offer.rooms + ' комнаты для ' + proposals[0].offer.guests + ' гостей';
newElement.querySelector('p:nth-of-type(4n)').textContent = 'Заезд после ' + proposals[0].offer.checkin + ', ' + 'выезд до ' + proposals[0].offers.checkout;

// если ли в массиве features объекта proposals[i] есть каждый из пунктов - клонирование соответствующего узла:
var featuresContainer = newElement.querySelector('.popup__features');
for (var j = 0; j <= proposals[0].offer.features.length - 1; j++) {
  switch (proposals[0].offer.features[j]) {
    case 'wifi':
      var itemFeatures = featuresContainer.querySelector('feature--wifi').cloneNode(true);
      featuresContainer.appendChild(itemFeatures);
      break;
    case 'dishwasher':
      itemFeatures = featuresContainer.querySelector('feature--dishwasher').cloneNode(true);
      featuresContainer.appendChild(itemFeatures);
      break;
    case 'parking':
      itemFeatures = featuresContainer.querySelector('feature--parking').cloneNode(true);
      featuresContainer.appendChild(itemFeatures);
      break;
    case 'washer':
      itemFeatures = featuresContainer.querySelector('feature--washer').cloneNode(true);
      featuresContainer.appendChild(itemFeatures);
      break;
    case 'elevator':
      itemFeatures = featuresContainer.querySelector('feature--elevator').cloneNode(true);
      featuresContainer.appendChild(itemFeatures);
      break;
    case 'conditioner':
      itemFeatures = featuresContainer.querySelector('feature--conditioner').cloneNode(true);
      featuresContainer.appendChild(itemFeatures);
      break;
  }
}
newElement.querySelector('p:nth-of-type(5n)').textContent = proposals[0].offer.description;
// клонирование элементов для вставки фото:
var photosContainer = newElement.querySelector('.popup__pictures');
for (var n = 1; n <= proposals[0].offer.pictures.length; n++) {
  var itemPhoto = photosContainer.querySelector('img').cloneNode(true);
  itemPhoto.setAttribute('src', 'proposals[0].offer.pictures[j-1]');
  photosContainer.appendChild(itemPhoto);
}
// вставка элемента во фрагмент:
var appendForm = function (childName) {
  mainFragment.appendChild(childName);
};
appendForm(newElement);
// вставка фрагмента в разметку:
var nextSibling = mapElement.querySelector('.map__filters-container');
mapElement.insertBefore(mainFragment, nextSibling);
