'use strict';

window.form = (function (utils, syncFields) {

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

  function updateAvatar(evt) {
    if (evt.target.files.length === 0) {
      return;
    }
    var uploadedFile = evt.target.files[0];
    if (uploadedFile.type.startsWith('image/')) {
      avatarReader.readAsDataURL(uploadedFile);
    }
  }

  function addPhoto(evt) {
    if (evt.target.files.length === 0) {
      return;
    }
    var uploadedFile = evt.target.files[0];

    if (uploadedFile.type.startsWith('image/')) {
      offerPhotoReader.readAsDataURL(uploadedFile);
      evt.target.value = '';
    }
  }

  var PALACE_THRESHOLD = 10000;
  var FLAT_THRESHOLD = 1000;
  var HUT_THRESHOLD = 0;
  var NO_GUESTS = '0';
  var THREE_GUESTS = '3';
  var ONE_ROOM = '1';
  var TWO_ROOMS = '2';
  var MANY_ROOMS = '100';
  var DEFAULT_BORDER_COLOR = 'rgb(217,217,211)';
  var INVALID_BORDER_COLOR = 'rgb(255, 0, 0)';
  var CHECKIN_VALUES = ['12', '13', '14'];
  var CHECKOUT_VALUES = ['12', '13', '14'];
  var PLACE_TYPES = ['hut', 'flat', 'palace'];
  var MIN_PRICES = [HUT_THRESHOLD, FLAT_THRESHOLD, PALACE_THRESHOLD];
  var ROOMS_COUNT_VALUES = [ONE_ROOM, TWO_ROOMS, MANY_ROOMS];
  var GUESTS_COUNT_VALUES = [NO_GUESTS, THREE_GUESTS, THREE_GUESTS];

  var offerForm = document.querySelector('.notice__form');
  var checkinField = offerForm.querySelector('#time');
  var checkoutField = offerForm.querySelector('#timeout');
  var priceField = offerForm.querySelector('#price');
  var typeField = offerForm.querySelector('#type');
  var roomsCountField = offerForm.querySelector('#room_number');
  var guestsCountField = offerForm.querySelector('#capacity');
  var titleField = offerForm.querySelector('#title');
  var locationField = offerForm.querySelector('#address');
  var avatarField = document.querySelector('.notice__photo input[type="file"]');
  var avatarPreview = document.querySelector('.notice__preview img');
  var offerPhotos = offerForm.querySelectorAll('.form__photo');
  var offerPhotoField = offerForm.querySelector('.form__photo-container input[type="file"]');

  var OFFER_PHOTOS_LIMIT = offerPhotos.length - 1;
  var offerPhotoReader = new FileReader();
  var avatarReader = new FileReader();

  offerPhotoReader.addEventListener('load', function () {
    offerPhotos[offerPhotosCount].querySelector('img').src = offerPhotoReader.result;
    offerPhotosCount = offerPhotosCount === OFFER_PHOTOS_LIMIT ? 0 : offerPhotosCount + 1;
  });

  avatarReader.addEventListener('load', function () {
    avatarPreview.src = avatarReader.result;
  });

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
  var offerPhotosCount = 0;

  syncFields(checkinField, checkoutField, CHECKIN_VALUES, CHECKOUT_VALUES, syncValues);
  syncFields(checkoutField, checkinField, CHECKOUT_VALUES, CHECKIN_VALUES, syncValues);

  syncFields(typeField, priceField, PLACE_TYPES, MIN_PRICES, syncValueWithMin);

  syncFields(roomsCountField, guestsCountField, ROOMS_COUNT_VALUES, GUESTS_COUNT_VALUES, syncValues);
  syncFields(guestsCountField, roomsCountField, GUESTS_COUNT_VALUES, ROOMS_COUNT_VALUES, syncValues);

  offerForm.addEventListener('invalid', highlightInvalidFields, true);

  avatarField.addEventListener('change', updateAvatar);
  offerPhotoField.addEventListener('change', addPhoto);

  utils.forEach(offerPhotos, function (offerPhotoContainer) {
    var offerImage = document.createElement('img');
    offerPhotoContainer.appendChild(offerImage);
  });

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

  return {
    updateLocation: function (x, y) {
      locationField.value = 'X: ' + x + ' Y: ' + y;
    }
  };
})(window.utils, window.syncFields);


