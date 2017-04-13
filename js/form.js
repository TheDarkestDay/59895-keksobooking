'use strict';

(function (syncFields) {

  function syncValues(field, value) {
    field.value = value;
  }

  function syncValueWithMin(field, value) {
    field.min = value;
  }

  function isFormValid(validators) {
    var result = true;
    validators.forEach(function (validator) {
      result = result && validator.constraint(validator.field.value);
    });
    return result;
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
    evt.target.style.borderColor = DEFAULT_BORDER_COLOR;
    evt.target.removeEventListener('input', removeErrorHighlight);
  }

  function highlightInvalidField(field) {
    highlightInvalidFields({
      target: field
    });
  }

  function highlightInvalidFields(evt) {
    evt.target.style.borderColor = INVALID_BORDER_COLOR;
    evt.target.addEventListener('input', removeErrorHighlight);
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
  var titleField = offerForm.querySelector('#title');

  var priceConstraint = function (value) {
    return value >= 1000 && value <= 1000000;
  };

  var titleConstraint = function (value) {
    return value.length >= 30 && value.length <= 100;
  };

  var validators = [
    {
      field: priceField,
      constraint: priceConstraint
    },
    {
      field: titleField,
      constraint: titleConstraint
    }
  ];

  syncFields(checkinField, checkoutField, ['12', '13', '14'], ['12', '13', '14'], syncValues);
  syncFields(checkoutField, checkinField, ['12', '13', '14'], ['12', '13', '14'], syncValues);
  syncFields(typeField, priceField, ['hut', 'flat', 'palace'], [0, FLAT_THRESHOLD, PALACE_THRESHOLD], syncValueWithMin);

  roomsCountField.addEventListener('input', suggestGuestCount);
  guestsCountField.addEventListener('input', suggestRoomsCount);

  offerForm.addEventListener('invalid', highlightInvalidFields, true);

  offerForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (!isFormValid(validators)) {
      validators.forEach(function (validator) {
        if (!validator.constraint(validator.field.value)) {
          highlightInvalidField(validator.field);
          validator.field.addEventListener('input', removeErrorHighlight);
        }
      });

      return false;
    }
    offerForm.reset();
    return true;
  });

})(window.syncFields);

