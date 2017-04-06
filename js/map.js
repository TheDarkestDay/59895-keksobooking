'use strict';

function forEach(array, cb) {
  Array.prototype.forEach.call(array, cb);
}

function getUniqueAvatarURL(maxID, prevOffers) {
  var id = Math.ceil(Math.random() * maxID);
  var result = 'img/avatars/user0' + id + '.png';
  var notUniqueCheck = prevOffers.some(function (offer) {
    return offer.author.avatar === result;
  });
  if (notUniqueCheck === false) {
    return result;
  }
  return getUniqueAvatarURL(maxID, prevOffers);
}

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(arr) {
  var idx = Math.floor(Math.random() * arr.length);
  return arr[idx];
}

function getRandomSubarray(arr) {
  var randomLength = getRandomInRange(0, arr.length);
  var arrCopy = arr.slice();
  var result = [];

  for (var i = 0; i < randomLength; i++) {
    var idx = getRandomInRange(0, arrCopy.length - 1);
    result.push(arrCopy[idx]);
    arrCopy.splice(idx, 1);
  }

  return result;
}

function generateRandomOffers(options) {
  var result = [];
  for (var i = 0; i < options.OFFERS_COUNT; i++) {
    var newOffer = {
      author: {
        avatar: ''
      },
      offer: {
        title: 'An Offer Title #' + (i + 1),
        address: 'A Sample Address',
        guests: getRandomInRange(options.MIN_GUESTS, options.MAX_GUESTS),
        price: getRandomInRange(options.MIN_PRICE, options.MAX_PRICE),
        type: getRandomElement(options.HOUSE_TYPES),
        rooms: getRandomInRange(options.MIN_ROOMS, options.MAX_ROOMS),
        checkin: getRandomElement(options.CHECKIN_TIMES),
        checkout: getRandomElement(options.CHECKOUT_TIMES),
        features: getRandomSubarray(options.FEATURES),
        description: '',
        photos: []
      },
      location: {
        x: getRandomInRange(options.MIN_X, options.MAX_X),
        y: getRandomInRange(options.MIN_Y, options.MAX_Y)
      }
    };

    newOffer.author.avatar = getUniqueAvatarURL(options.MAX_USER_ID, result);

    result.push(newOffer);
  }
  return result;
}

function humanizeType(flatType) {
  var result = '';
  switch (flatType) {
    case 'flat':
      result = 'Квартира';
      break;
    case 'house':
      result = 'Дом';
      break;
    case 'bungalo':
      result = 'Бунгало';
      break;
  }
  return result;
}

function displayOfferDetails(offer, template) {
  var offerElem = template.cloneNode(true);
  var offerFeaturesElem = offerElem.querySelector('.lodge__features');
  var nodeToReplace = offerDialog.querySelector('.dialog__panel');
  offerElem.querySelector('.lodge__title').textContent = offer.title;
  offerElem.querySelector('.lodge__address').textContent = offer.address;
  offerElem.querySelector('.lodge__price').innerHTML = offer.price + '&#x20bd;/ночь';
  offerElem.querySelector('.lodge__type').textContent = humanizeType(offer.type);
  offerElem.querySelector('.lodge__rooms-and-guests').textContent = ' Для ' + offer.guests + ' гостей в ' + offer.rooms + ' комнатах';
  offerElem.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
  offerElem.querySelector('.lodge__description').textContent = offer.description;

  offer.features.forEach(function (feature) {
    var featElem = document.createElement('span');
    featElem.classList.add('feature__image', 'feature__image--' + feature);
    offerFeaturesElem.appendChild(featElem);
  });

  offerDialog.replaceChild(offerElem, nodeToReplace);
}

function openOfferDetailsFromKeyboard(evt) {
  if (evt.keyCode === ENTER) {
    openOfferDetails(evt);
  }
}

function closeOfferDialogFromKeyboard(evt) {
  if (evt.keyCode === ESCAPE) {
    closeOfferDialog();
  }
}

function openOfferDetails(evt) {
  var pinElem = evt.target;
  if (pinElem.matches('img')) {
    pinElem = evt.target.parentElement;
  }
  var offerIdx = Number(pinElem.dataset.index);
  if (offerDialog.style.display === 'none') {
    offerDialog.style.display = 'block';
  }
  deactivateAllPins(mapPins);
  pinElem.classList.add('pin--active');
  displayOfferDetails(offers[offerIdx].offer, lodgeTemplate);
}

function deactivateAllPins(pins) {
  forEach(pins, function (pin) {
    pin.classList.remove('pin--active');
  });
}

function closeOfferDialog() {
  offerDialog.style.display = 'none';
  deactivateAllPins(mapPins);
}

var map = document.querySelector('.tokyo__pin-map');
var lodgeTemplate = document.querySelector('#lodge-template').content;
var offerDialog = document.querySelector('#offer-dialog');

var GENERATOR_OPTIONS = {
  HOUSE_TYPES: ['flat', 'house', 'bungalo'],
  MIN_PRICE: 1000,
  MAX_PRICE: 1000000,
  MIN_ROOMS: 1,
  MAX_ROOMS: 5,
  MIN_X: 300,
  MAX_X: 900,
  MIN_Y: 100,
  MAX_Y: 500,
  MIN_GUESTS: 1,
  MAX_GUESTS: 7,
  FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  CHECKIN_TIMES: ['12:00', '13:00', '14:00'],
  CHECKOUT_TIMES: ['12:00', '13:00', '14:00'],
  MAX_USER_ID: 8,
  OFFERS_COUNT: 8
};

var ENTER = 13;
var ESCAPE = 27;

var offers = generateRandomOffers(GENERATOR_OPTIONS);

var offersFragment = document.createDocumentFragment();
offers.forEach(function (offer, idx) {
  var nextOffer = document.createElement('div');
  var nextOfferPic = document.createElement('img');
  nextOffer.classList.add('pin');
  nextOffer.dataset.index = idx;
  nextOffer.style.left = offer.location.x + 'px';
  nextOffer.style.top = offer.location.y + 'px';
  nextOfferPic.src = offer.author.avatar;
  nextOfferPic.tabIndex = '0';
  nextOffer.appendChild(nextOfferPic);
  offersFragment.appendChild(nextOffer);
});
map.appendChild(offersFragment);

displayOfferDetails(offers[0].offer, lodgeTemplate);

var mapPins = document.querySelectorAll('.pin');
var closeDialogBtn = offerDialog.querySelector('.dialog__close');

forEach(mapPins, function (pin) {
  pin.addEventListener('click', openOfferDetails);
  pin.addEventListener('keydown', openOfferDetailsFromKeyboard);
});

closeDialogBtn.addEventListener('click', closeOfferDialog);

document.addEventListener('keydown', closeOfferDialogFromKeyboard);
