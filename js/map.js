'use strict';

function generateRandomImgUrl(maxID) {
  var id = Math.ceil(Math.random() * maxID);
  return 'img/avatars/0' + id + '.png';
}

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(arr) {
  var idx = Math.floor(Math.random() * arr.length);
  return arr[idx];
}

function generateRandomOffers(options) {
  var result = [];
  for (var i = 0; i < options.OFFERS_COUNT; i++) {

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
  FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  CHECKIN_TIMES: ['12:00', '13:00', '14:00'],
  CHECKOUT_TIMES: ['12:00', '13:00', '14:00'],
  MAX_USER_ID: 8,
  OFFERS_COUNT: 8
};

var offers = generateRandomOffers(GENERATOR_OPTIONS);
