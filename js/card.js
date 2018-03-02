// модуль экспортирует функцию генерации карточки
'use strict';

(function () {
  var cardElementTemplate = document.querySelector('template').content.querySelector('.map__card');
  var CURRENCY = '&#x20bd';
  var MAP_CARD_WIDTH = 206;
  window.createCardElement = function (prop) {
    var cardElement = cardElementTemplate.cloneNode(true);
    cardElement.querySelector('h3').textContent = prop.offer.title;
    cardElement.querySelector('p:first-of-type').textContent = prop.offer.address;
    cardElement.querySelector('p:nth-of-type(2n)').innerHTML = prop.offer.price + ' ' + CURRENCY + '/ночь';
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
    var featuresCollection = cardElement.querySelectorAll('.feature');
    for (var i = 0; i < featuresCollection.length; i++) {
      features.removeChild(featuresCollection[i]);
    }
    for (var j = 0; j <= prop.offer.features.length - 1; j++) {
      switch (prop.offer.features[j]) {
        case 'wifi':
          features.appendChild(featuresCollection[0]);
          break;
        case 'dishwasher':
          features.appendChild(featuresCollection[1]);
          break;
        case 'parking':
          features.appendChild(featuresCollection[2]);
          break;
        case 'washer':
          features.appendChild(featuresCollection[3]);
          break;
        case 'elevator':
          features.appendChild(featuresCollection[4]);
          break;
        case 'conditioner':
          features.appendChild(featuresCollection[5]);
          break;
      }
    }
    cardElement.querySelector('p:nth-of-type(5n)').textContent = prop.offer.description;
    var photosContainer = cardElement.querySelector('.popup__pictures');
    for (var n = 1; n <= prop.offer.photos.length; n++) {
      var itemPhoto = photosContainer.querySelector('img').cloneNode(true);
      itemPhoto.setAttribute('src', prop.offer.photos[n - 1]);
      itemPhoto.setAttribute('width', MAP_CARD_WIDTH / 3);
      itemPhoto.setAttribute('height', MAP_CARD_WIDTH / 3); // чтобы превью фото были квадратными, незвисимо от фактической высоты
    photosContainer.appendChild(itemPhoto);
  }
    if (prop.offer.photos.length > 3) {
      photosContainer.setAttribute('style', 'overflow: auto; height: 70px;');
    }
    cardElement.querySelector('img.popup__avatar').setAttribute('src', prop.author.avatar);
    return cardElement;
  };
})();
