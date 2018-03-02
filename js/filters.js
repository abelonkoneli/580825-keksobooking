'use strict';

(function () {
  window.filterButtons = function () {
    var mapFilters = document.querySelector('.map__filters');
    var typeFilter = mapFilters.querySelector('#housing-type');
    var priceFilter = mapFilters.querySelector('#housing-price');
    var roomsFilter = mapFilters.querySelector('#housing-rooms');
    var guestsFilter = mapFilters.querySelector('#housing-guests');
    var wifiFilter = mapFilters.querySelector('#filter-wifi');
    var dishwasherFilter = mapFilters.querySelector('#filter-dishwasher');
    var parkingFilter = mapFilters.querySelector('#filter-parking');
    var washerFilter = mapFilters.querySelector('#filter-washer');
    var elevatorFilter = mapFilters.querySelector('#filter-elevator');
    var conditionerFilter = mapFilters.querySelector('#filter-conditioner');
    window.optionalOffers = [];

    var typeCallback = function (housing) {
      if (typeFilter.value === 'any') {
        return true;
      } else {
        return housing.offer.type === typeFilter.value;
      }
    };

    var priceCallback = function (housing) {
      if (priceFilter.value === 'any') {
        return true;
      } else if (priceFilter.value === 'middle') {
        return housing.offer.price < 50000 && housing.offer.price > 10000;
      } else if (priceFilter.value === 'low') {
        return housing.offer.price < 10000;
      } else {
        return housing.offer.price >= 50000;
      }
    };

    var roomCallback = function (housing) {
      if (roomsFilter.value === 'any') {
        return true;
      } else {
        return housing.offer.rooms === +roomsFilter.value;
      }
    };

    var guestCallback = function (housing) {
      if (guestsFilter.value === 'any') {
        return true;
      } else {
        return housing.offer.guests === +guestsFilter.value;
      }
    };

    var wifiCallback = function (housing) {
      if (wifiFilter.checked === true) {
        return housing.offer.features.indexOf('wifi') !== -1;
      } else {
        return true;
      }
    };

    var dishwasherCallback = function (housing) {
      if (dishwasherFilter.checked === true) {
        return housing.offer.features.indexOf('dishwasher') !== -1;
      } else {
        return true;
      }
    };

    var parkingCallback = function (housing) {
      if (parkingFilter.checked === true) {
        return housing.offer.features.indexOf('parking') !== -1;
      } else {
        return true;
      }
    };

    var washerCallback = function (housing) {
      if (washerFilter.checked === true) {
        return housing.offer.features.indexOf('washer') !== -1;
      } else {
        return true;
      }
    };

    var elevatorCallback = function (housing) {
      if (elevatorFilter.checked === true) {
        return housing.offer.features.indexOf('elevator') !== -1;
      } else {
        return true;
      }
    };

    var conditionerCallback = function (housing) {
      if (conditionerFilter.checked === true) {
        return housing.offer.features.indexOf('conditioner') !== -1;
      } else {
        return true;
      }
    };

    var showFilteredButtons = function () {
      var pinsCollection = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      var pinsContainer = document.querySelector('.map__pins');
      for (var i = 0; i < pinsCollection.length; i++) {
        pinsContainer.removeChild(pinsCollection[i]);
      }
      if (window.data.mapElement.contains(window.data.mapElement.querySelector('.map__card'))) {
        window.utilities.removeCardElement();
      }
      window.insertButtons(window.optionalOffers.slice().filter(function (housing) {
        return typeCallback(housing) && priceCallback(housing) && roomCallback(housing) && guestCallback(housing) && wifiCallback(housing) && dishwasherCallback(housing) && parkingCallback(housing) && washerCallback(housing) && elevatorCallback(housing) && conditionerCallback(housing);
      }));
    };

    mapFilters.addEventListener('change', function (evt) {
      if (evt.target.tagName.toLowerCase() === 'input' ||
      evt.target.tagName.toLowerCase() === 'select') {
        showFilteredButtons();
        window.utilities.debounce(showFilteredButtons);
      }
    });
  };
  window.filterButtons();
})();
