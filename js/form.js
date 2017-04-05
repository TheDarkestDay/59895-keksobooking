'use strict';

function syncTime(evt) {
  checkinField.value = evt.target.value;
  checkoutField.value = evt.target.value;
}

function suggestType(evt) {
  var price = evt.target.value;
  if (price >= PALACE_THRESHOLD) {
    typeField.value = 'palace';
    return;
  }

  if (price >= FLAT_THRESHOLD) {
    typeField.value = 'flat';
    return;
  }

  typeField.value = 'hut';
}

function suggestPrice(evt) {
  switch (evt.target.value) {
    case 'palace':
      priceField.value = PALACE_THRESHOLD;
      break;
    case 'flat':
      priceField.value = FLAT_THRESHOLD;
      break;
    default:
      priceField.value = HUT_THRESHOLD;
      break;
  }
}

function suggestGuestCount(evt) {
  switch (evt.target.value) {
    case '1':
      guestsCountField.value = 0;
      break;
    default:
      guestsCountField.value = 3;
      break;
  }
}

function suggestRoomsCount(evt) {
  switch (evt.target.value) {
    case '0':
      roomsCountField.value = 1;
      break;
    default:
      roomsCountField.value = 2;
  }
}

var PALACE_THRESHOLD = 10000;
var FLAT_THRESHOLD = 1000;
var HUT_THRESHOLD = 0;

var checkinField = document.querySelector('#time');
var checkoutField = document.querySelector('#timeout');
var priceField = document.querySelector('#price');
var typeField = document.querySelector('#type');
var roomsCountField = document.querySelector('#room_number');
var guestsCountField = document.querySelector('#capacity');

checkinField.addEventListener('change', syncTime);
checkoutField.addEventListener('change', syncTime);

priceField.addEventListener('input', suggestType);
typeField.addEventListener('change', suggestPrice);

roomsCountField.addEventListener('change', suggestGuestCount);
guestsCountField.addEventListener('change', suggestRoomsCount);
