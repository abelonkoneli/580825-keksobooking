'use strict';

(function () {
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
  var HousingPrice = {
    MAX: 50000,
    MIN: 10000
  };

  var CbForFilters = {
    typeCb: function (housing) {
      if (typeFilter.value === 'any') {
        return true;
      } else {
        return housing.offer.type === typeFilter.value;
      }
    },

    priceCb: function (housing) {
      if (priceFilter.value === 'any') {
        return true;
      } else if (priceFilter.value === 'middle') {
        return housing.offer.price < HousingPrice.MAX && housing.offer.price > HousingPrice.MIN;
      } else if (priceFilter.value === 'low') {
        return housing.offer.price < HousingPrice.MIN;
      } else {
        return housing.offer.price >= HousingPrice.MAX;
      }
    },

    roomCb: function (housing) {
      if (roomsFilter.value === 'any') {
        return true;
      } else {
        return housing.offer.rooms === +roomsFilter.value;
      }
    },

    guestCb: function (housing) {
      if (guestsFilter.value === 'any') {
        return true;
      } else {
        return housing.offer.guests === +guestsFilter.value;
      }
    },

    wifiCb: function (housing) {
      if (wifiFilter.checked) {
        return housing.offer.features.indexOf('wifi') !== -1;
      } else {
        return true;
      }
    },

    dishwasherCb: function (housing) {
      if (dishwasherFilter.checked) {
        return housing.offer.features.indexOf('dishwasher') !== -1;
      } else {
        return true;
      }
    },

    parkingCb: function (housing) {
      if (parkingFilter.checked) {
        return housing.offer.features.indexOf('parking') !== -1;
      } else {
        return true;
      }
    },

    washerCb: function (housing) {
      if (washerFilter.checked) {
        return housing.offer.features.indexOf('washer') !== -1;
      } else {
        return true;
      }
    },

    elevatorCb: function (housing) {
      if (elevatorFilter.checked) {
        return housing.offer.features.indexOf('elevator') !== -1;
      } else {
        return true;
      }
    },

    conditionerCb: function (housing) {
      if (conditionerFilter.checked) {
        return housing.offer.features.indexOf('conditioner') !== -1;
      } else {
        return true;
      }
    }
  };

  var showFilteredButtons = function () {
    window.utilities.removePinCollection();
    if (window.data.mapElement.contains(window.data.mapElement.querySelector('.map__card'))) {
      window.utilities.removeCardElement();
    }
    window.insertButtons(window.optionalOffers.slice().filter(function (housing) {
      return CbForFilters.typeCb(housing) && CbForFilters.priceCb(housing) && CbForFilters.roomCb(housing) && CbForFilters.guestCb(housing) && CbForFilters.wifiCb(housing) && CbForFilters.dishwasherCb(housing) && CbForFilters.parkingCb(housing) && CbForFilters.washerCb(housing) && CbForFilters.elevatorCb(housing) && CbForFilters.conditionerCb(housing);
    }));
  };

  window.filterButtons = function () {
    window.data.mapFiltersElement.addEventListener('change', function (evt) {
      if (evt.target.tagName.toLowerCase() === 'input' ||
      evt.target.tagName.toLowerCase() === 'select') {
        showFilteredButtons();
        window.utilities.debounce(showFilteredButtons);
      }
    });
  };

  window.filterButtons();

})();
