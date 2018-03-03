// модуль экспортирует функцию генерации карточки
'use strict';

(function () {
  var CURRENCY = '&#x20bd';
  var cardElementTemplate = document.querySelector('template').content.querySelector('.map__card');

  var getTypeName = function (el) {
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
    if (el.offer.type === typeNames[1].type) {
      return typeNames[1].name;
    } else if (el.offer.type === typeNames[2].type) {
      return typeNames[2].name;
    } return typeNames[0].name;
  };

  var getFeatures = function (el, arr) {
    var featuresElement = el.querySelector('.popup__features');
    var featureCollection = el.querySelectorAll('.feature');
    for (var i = 0; i < featureCollection.length; i++) {
      featuresElement.removeChild(featureCollection[i]);
    }
    for (i = 0; i <= arr.offer.features.length - 1; i++) {
      switch (arr.offer.features[i]) {
        case 'wifi':
          featuresElement.appendChild(featureCollection[0]);
          break;
        case 'dishwasher':
          featuresElement.appendChild(featureCollection[1]);
          break;
        case 'parking':
          featuresElement.appendChild(featureCollection[2]);
          break;
        case 'washer':
          featuresElement.appendChild(featureCollection[3]);
          break;
        case 'elevator':
          featuresElement.appendChild(featureCollection[4]);
          break;
        case 'conditioner':
          featuresElement.appendChild(featureCollection[5]);
          break;
      }
    }
  };

  var addPhotos = function (el, proposal) {
    var MAP_CARD_WIDTH = 206;
    var SCROLL_WIDTH = 17;
    var photosContainerElement = el.querySelector('.popup__pictures');
    for (var i = 1; i <= proposal.offer.photos.length; i++) {
      var photoElement = photosContainerElement.querySelector('img').cloneNode(true);
      photoElement.setAttribute('src', proposal.offer.photos[i - 1]);
      photoElement.setAttribute('width', MAP_CARD_WIDTH / 3);
      photoElement.setAttribute('height', MAP_CARD_WIDTH / 3);
      photosContainerElement.appendChild(photoElement);
    }
    if (proposal.offer.photos.length > 3) {
      var photoCollection = photosContainerElement.querySelectorAll('img');
      photosContainerElement.setAttribute('style', 'overflow: auto; height: 70px;');
      for (i = 1; i < photoCollection.length; i++) {
        photoCollection[i].setAttribute('width', (MAP_CARD_WIDTH - SCROLL_WIDTH) / 3);
        photoCollection[i].setAttribute('height', (MAP_CARD_WIDTH - SCROLL_WIDTH) / 3);
      }
    }
  };

  window.createCardElement = function (proposal) {
    var cardElement = cardElementTemplate.cloneNode(true);
    cardElement.querySelector('h3').textContent = proposal.offer.title;
    cardElement.querySelector('p:first-of-type').textContent = proposal.offer.address;
    cardElement.querySelector('p:nth-of-type(2n)').innerHTML = proposal.offer.price + ' ' + CURRENCY + '/ночь';
    cardElement.querySelector('h4').textContent = getTypeName(proposal);
    cardElement.querySelector('p:nth-of-type(3n)').textContent = proposal.offer.rooms + ' комнаты для ' + proposal.offer.guests + ' гостей';
    cardElement.querySelector('p:nth-of-type(4n)').textContent = 'Заезд после ' + proposal.offer.checkin + ', ' + 'выезд до ' + proposal.offer.checkout;
    getFeatures(cardElement, proposal);
    cardElement.querySelector('p:nth-of-type(5n)').textContent = proposal.offer.description;
    addPhotos(cardElement, proposal);
    cardElement.querySelector('img.popup__avatar').setAttribute('src', proposal.author.avatar);
    return cardElement;
  };
})();
