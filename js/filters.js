'use strict';

(function () {
  var housingPrice = {
    MAX: 50000,
    MIN: 10000
  };
  var typeFilter = window.data.mapFiltersElement.querySelector('#housing-type');
  var priceFilter = window.data.mapFiltersElement.querySelector('#housing-price');
  var roomsFilter = window.data.mapFiltersElement.querySelector('#housing-rooms');
  var guestsFilter = window.data.mapFiltersElement.querySelector('#housing-guests');
  var wifiFilter = window.data.mapFiltersElement.querySelector('#filter-wifi');
  var dishwasherFilter = window.data.mapFiltersElement.querySelector('#filter-dishwasher');
  var parkingFilter = window.data.mapFiltersElement.querySelector('#filter-parking');
  var washerFilter = window.data.mapFiltersElement.querySelector('#filter-washer');
  var elevatorFilter = window.data.mapFiltersElement.querySelector('#filter-elevator');
  var conditionerFilter = window.data.mapFiltersElement.querySelector('#filter-conditioner');
  window.optionalOffers = [];

  var chooseType = function (housing) {
    if (typeFilter.value === 'any') {
      return true;
    }
    return housing.offer.type === typeFilter.value;
  };

  var choosePrice = function (housing) {
    if (priceFilter.value === 'any') {
      return true;
    } else if (priceFilter.value === 'middle') {
      return housing.offer.price < housingPrice.MAX && housing.offer.price > housingPrice.MIN;
    } else if (priceFilter.value === 'low') {
      return housing.offer.price < housingPrice.MIN;
    }
    return housing.offer.price >= housingPrice.MAX;
  };

  var chooseRooms = function (housing) {
    if (roomsFilter.value === 'any') {
      return true;
    }
    return housing.offer.rooms === +roomsFilter.value;
  };

  var chooseGuests = function (housing) {
    if (guestsFilter.value === 'any') {
      return true;
    }
    return housing.offer.guests === +guestsFilter.value;
  };

  var chooseWiFi = function (housing) {
    if (wifiFilter.checked) {
      return housing.offer.features.indexOf('wifi') !== -1;
    }
    return true;
  };

  var chooseDishwasher = function (housing) {
    if (dishwasherFilter.checked) {
      return housing.offer.features.indexOf('dishwasher') !== -1;
    }
    return true;
  };

  var chooseParking = function (housing) {
    if (parkingFilter.checked) {
      return housing.offer.features.indexOf('parking') !== -1;
    }
    return true;
  };

  var chooseWasher = function (housing) {
    if (washerFilter.checked) {
      return housing.offer.features.indexOf('washer') !== -1;
    }
    return true;
  };

  var chooseElevator = function (housing) {
    if (elevatorFilter.checked) {
      return housing.offer.features.indexOf('elevator') !== -1;
    }
    return true;
  };

  var chooseConditioner = function (housing) {
    if (conditionerFilter.checked) {
      return housing.offer.features.indexOf('conditioner') !== -1;
    }
    return true;
  };

  var showFilteredButtons = function () {
    window.utilities.removePins();
    if (window.data.mapElement.contains(window.data.mapElement.querySelector('.map__card'))) {
      window.utilities.removeCardElementHandler();
    }
    window.insertButtons(window.optionalOffers.slice().filter(function (housing) {
      return chooseType(housing) && choosePrice(housing) && chooseRooms(housing) && chooseGuests(housing) && chooseWiFi(housing) && chooseDishwasher(housing) && chooseParking(housing) && chooseWasher(housing) && chooseElevator(housing) && chooseConditioner(housing);
    }));
  };

  window.filterButtons = function () {
    window.data.mapFiltersElement.addEventListener('change', function (evt) {
      if (evt.target.tagName.toLowerCase() === 'input' ||
      evt.target.tagName.toLowerCase() === 'select') {
        window.utilities.debounce(showFilteredButtons);
      }
    });
  };
  window.filterButtons();
})();
