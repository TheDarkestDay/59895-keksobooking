'use strict';

(function (map) {

  function handleChange(evt) {
    filtersArray = Object.keys(filters).map(function (key) {
      return filters[key];
    });
    map.filterOffers(filtersArray);
  }

  function updateTypeFilter(evt) {
    filters.type = typeFilters[evt.target.value];
  }

  function updateRoomsCountFilter(evt) {
    filters.roomsCount = roomsCountFilters[evt.target.value];
  }

  function updateGuestsCountFilter(evt) {
    filters.guestsCount = guestsCountFilters[evt.target.value];
  }

  function updatePriceFilter(evt) {
    filters.priceRange = priceFilters[evt.target.value];
  }

  function updateFeatures(evt) {
    var feature = evt.target.value;
    if (!evt.target.checked) {
      var featureIdx = desiredFeatures.indexOf(feature);
      desiredFeatures.splice(featureIdx, 1);
    } else {
      desiredFeatures.push(feature);
    }
    filters.features = featuresFilter(desiredFeatures);
  }

  function allowAny() {
    return true;
  }

  function typeFilter(flatType) {
    return function (dataRecord) {
      return dataRecord.offer.type === flatType;
    };
  }

  function roomsCountFilter(roomsCount) {
    return function (dataRecord) {
      return dataRecord.offer.rooms === roomsCount;
    };
  }

  function guestsCountFilter(guestsCount) {
    return function (dataRecord) {
      return dataRecord.offer.guests === guestsCount;
    };
  }

  function lowPriceFilter(dataRecord) {
    return dataRecord.offer.price < LOW_PRICE;
  }

  function middlePriceFilter(dataRecord) {
    return dataRecord.offer.price >= LOW_PRICE && dataRecord.offer.price <= HIGH_PRICE;
  }

  function highPriceFilter(dataRecord) {
    return dataRecord.offer.price > HIGH_PRICE;
  }

  function featuresFilter(features) {
    return function (dataRecord) {
      var check = true;
      features.forEach(function (feat) {
        if (dataRecord.offer.features.indexOf(feat) === -1) {
          check = false;
        }
      });
      return check;
    };
  }

  var filterForm = document.querySelector('.tokyo__filters');
  var typeField = filterForm.querySelector('#housing_type');
  var priceField = filterForm.querySelector('#housing_price');
  var roomsCountField = filterForm.querySelector('#housing_room-number');
  var guestsCountField = filterForm.querySelector('#housing_guests-number');
  var featuresFieldset = filterForm.querySelector('.tokyo__filter-set');

  var LOW_PRICE = 10000;
  var HIGH_PRICE = 50000;

  var filters = {};
  var filtersArray = [];
  var desiredFeatures = [];

  var typeFilters = {
    'any': allowAny,
    'flat': typeFilter('flat'),
    'house': typeFilter('house'),
    'bungalo': typeFilter('bungalo')
  };

  var roomsCountFilters = {
    'any': allowAny,
    '1': roomsCountFilter(1),
    '2': roomsCountFilter(2),
    '3': roomsCountFilter(3)
  };

  var guestsCountFilters = {
    'any': allowAny,
    '1': guestsCountFilter(1),
    '2': guestsCountFilter(2)
  };

  var priceFilters = {
    'low': lowPriceFilter,
    'middle': middlePriceFilter,
    'high': highPriceFilter
  };

  filterForm.addEventListener('change', handleChange);

  typeField.addEventListener('change', updateTypeFilter);
  roomsCountField.addEventListener('change', updateRoomsCountFilter);
  guestsCountField.addEventListener('change', updateGuestsCountFilter);
  priceField.addEventListener('change', updatePriceFilter);
  featuresFieldset.addEventListener('change', updateFeatures);

})(window.map);
