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
      guestsCountField.value = NO_GUESTS;
      break;
    default:
      guestsCountField.value = THREE_GUESTS;
      break;
  }
}

function suggestRoomsCount(evt) {
  switch (evt.target.value) {
    case '0':
      roomsCountField.value = ONE_ROOM;
      break;
    default:
      roomsCountField.value = TWO_ROOMS;
  }
}

function removeErrorHighlight(evt) {
  if (evt.target.style.borderColor === INVALID_BORDER_COLOR) {
    evt.target.style.borderColor = DEFAULT_BORDER_COLOR;
  }
}

function highlightInvalidFields(evt) {
  evt.target.style.borderColor = INVALID_BORDER_COLOR;
}

var PALACE_THRESHOLD = 10000;
var FLAT_THRESHOLD = 1000;
var HUT_THRESHOLD = 0;
var NO_GUESTS = 0;
var THREE_GUESTS = 3;
var ONE_ROOM = 1;
var TWO_ROOMS = 2;
var DEFAULT_BORDER_COLOR = 'rgb(217,217,211)';
var INVALID_BORDER_COLOR = 'rgb(255, 0, 0)';

var offerForm = document.querySelector('.notice__form');
var checkinField = offerForm.querySelector('#time');
var checkoutField = offerForm.querySelector('#timeout');
var priceField = offerForm.querySelector('#price');
var typeField = offerForm.querySelector('#type');
var roomsCountField = offerForm.querySelector('#room_number');
var guestsCountField = offerForm.querySelector('#capacity');

checkinField.addEventListener('change', syncTime);
checkoutField.addEventListener('change', syncTime);

priceField.addEventListener('input', suggestType);
typeField.addEventListener('change', suggestPrice);

roomsCountField.addEventListener('change', suggestGuestCount);
guestsCountField.addEventListener('change', suggestRoomsCount);

offerForm.addEventListener('invalid', highlightInvalidFields, true);

offerForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  offerForm.reset();
});

offerForm.addEventListener('input', removeErrorHighlight);
