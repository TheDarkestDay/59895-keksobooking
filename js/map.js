'use strict';

function getUniqueAvatarURL(maxID, prevOffers) {
  var id = Math.ceil(Math.random() * maxID);
  var result = 'img/avatars/0' + id + '.png';
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

var offers = generateRandomOffers(GENERATOR_OPTIONS);
console.log(offers);
