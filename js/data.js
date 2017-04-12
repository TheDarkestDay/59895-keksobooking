'use strict';

window.offersData = (function (utils) {

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
          guests: utils.getRandomInRange(options.MIN_GUESTS, options.MAX_GUESTS),
          price: utils.getRandomInRange(options.MIN_PRICE, options.MAX_PRICE),
          type: utils.getRandomElement(options.HOUSE_TYPES),
          rooms: utils.getRandomInRange(options.MIN_ROOMS, options.MAX_ROOMS),
          checkin: utils.getRandomElement(options.CHECKIN_TIMES),
          checkout: utils.getRandomElement(options.CHECKOUT_TIMES),
          features: utils.getRandomSubarray(options.FEATURES),
          description: '',
          photos: []
        },
        location: {
          x: utils.getRandomInRange(options.MIN_X, options.MAX_X),
          y: utils.getRandomInRange(options.MIN_Y, options.MAX_Y)
        }
      };

      newOffer.author.avatar = getUniqueAvatarURL(options.MAX_USER_ID, result);

      result.push(newOffer);
    }
    return result;
  }

  return generateRandomOffers(GENERATOR_OPTIONS);
})(window.utils);
