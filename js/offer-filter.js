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

  function allowAny() {
    return true;
  }

  function typeFilter(flatType) {
    return function (dataRecord) {
      return dataRecord.offer.type === flatType;
    };
  }

  var filterForm = document.querySelector('.tokyo__filters');
  var typeField = filterForm.querySelector('#housing_type');
  var priceField = filterForm.querySelector('#housing_price');
  var roomsCountField = filterForm.querySelector('#housing_room-number');
  var guestsCountField = filterForm.querySelector('#housing_guests-number');

  var filters = {};
  var filtersArray = [];
  var typeFilters = {
    'any': allowAny,
    'flat': typeFilter('flat'),
    'house': typeFilter('house'),
    'bungalo': typeFilter('bungalo')
  };

  filterForm.addEventListener('change', handleChange);

  typeField.addEventListener('change', updateTypeFilter);

})(window.map);
