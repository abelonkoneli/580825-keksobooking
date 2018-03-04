// модуль экспортирует функцию генерации карточки
'use strict';

(function () {
  var CURRENCY = '&#x20bd';
  var Z_INDEX_MAX = 9999;
  var cardElementTemplate = document.querySelector('template').content.querySelector('.map__card');

  var getTypeName = function (element) {
    var typeNames = [
      {
        type: 'bungalo',
        name: 'Бунгало'
      },
      {
        type: 'flat',
        name: 'Квартира'
      },
      {
        type: 'house',
        name: 'Дом'
      }
    ];
    if (element.offer.type === typeNames[1].type) {
      return typeNames[1].name;
    } else if (element.offer.type === typeNames[2].type) {
      return typeNames[2].name;
    } return typeNames[0].name;
  };

  var getFeatures = function (element, array) {
    var featuresElement = element.querySelector('.popup__features');
    var features = element.querySelectorAll('.feature');
    for (var i = 0; i < features.length; i++) {
      featuresElement.removeChild(features[i]);
    }
    for (i = 0; i <= array.offer.features.length - 1; i++) {
      switch (array.offer.features[i]) {
        case 'wifi':
          featuresElement.appendChild(features[0]);
          break;
        case 'dishwasher':
          featuresElement.appendChild(features[1]);
          break;
        case 'parking':
          featuresElement.appendChild(features[2]);
          break;
        case 'washer':
          featuresElement.appendChild(features[3]);
          break;
        case 'elevator':
          featuresElement.appendChild(features[4]);
          break;
        case 'conditioner':
          featuresElement.appendChild(features[5]);
          break;
      }
    }
  };

  var addPhotos = function (el, proposal) {
    var MAP_CARD_WIDTH = 206;
    var SCROLL_WIDTH = 17;
    var PHOTOS_GREED_WIDTH = 3;
    var PHOTOS_CONTAINER_HEIGHT = '70';
    var photosContainerElement = el.querySelector('.popup__pictures');
    for (var i = 1; i <= proposal.offer.photos.length; i++) {
      var photoElement = photosContainerElement.querySelector('img').cloneNode(true);
      photoElement.src = proposal.offer.photos[i - 1] + '';
      photoElement.width = MAP_CARD_WIDTH / PHOTOS_GREED_WIDTH + 'px';
      photoElement.height = MAP_CARD_WIDTH / PHOTOS_GREED_WIDTH + 'px';
      photosContainerElement.appendChild(photoElement);
    }
    if (proposal.offer.photos.length > PHOTOS_GREED_WIDTH) {
      var photos = photosContainerElement.querySelectorAll('img');
      photosContainerElement.style.height = PHOTOS_CONTAINER_HEIGHT + 'px';
      photosContainerElement.style.overflowY = 'auto';
      for (i = 1; i < photos.length; i++) {
        photos[i].style.width = (MAP_CARD_WIDTH - SCROLL_WIDTH) / PHOTOS_GREED_WIDTH + 'px';
        photos[i].style.height = (MAP_CARD_WIDTH - SCROLL_WIDTH) / PHOTOS_GREED_WIDTH + 'px';
      }
    }
  };

  window.createCardElement = function (proposal) {
    var cardElement = cardElementTemplate.cloneNode(true);
    cardElement.style.zIndex = Z_INDEX_MAX;
    cardElement.querySelector('h3').textContent = proposal.offer.title;
    cardElement.querySelector('p:first-of-type').textContent = proposal.offer.address;
    cardElement.querySelector('p:nth-of-type(2n)').innerHTML = proposal.offer.price + ' ' + CURRENCY + '/ночь';
    cardElement.querySelector('h4').textContent = getTypeName(proposal);
    cardElement.querySelector('p:nth-of-type(3n)').textContent = proposal.offer.rooms + ' комнаты для ' + proposal.offer.guests + ' гостей';
    cardElement.querySelector('p:nth-of-type(4n)').textContent = 'Заезд после ' + proposal.offer.checkin + ', ' + 'выезд до ' + proposal.offer.checkout;
    getFeatures(cardElement, proposal);
    cardElement.querySelector('p:nth-of-type(5n)').textContent = proposal.offer.description;
    addPhotos(cardElement, proposal);
    cardElement.querySelector('img.popup__avatar').src = proposal.author.avatar;
    return cardElement;
  };
})();
