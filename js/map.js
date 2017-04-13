'use strict';

(function (utils, offerCard, loadOffers, pin, errorMessage) {

  function openOfferDetailsFromKeyboard(evt) {
    if (evt.keyCode === ENTER) {
      openOfferDetailsOnClick(evt);
    }
  }

  function closeOfferDetails() {
    offerCard.close();
    deactivateAllPins();
  }

  function closeOfferDetailsFromKeyboard(evt) {
    if (evt.keyCode === ESCAPE) {
      closeOfferDetails();
    }
  }

  function deactivateAllPins() {
    window.utils.forEach(mapPins, function (pinElem) {
      pin.deactivate(pinElem);
    });
  }

  function processResponse(response) {
    if (!response.success) {
      errorMessage.display(response.data);
      return false;
    }
    offersData = response.data;

    offersData.forEach(function (offer, idx) {
      var nextOffer = pin.render(offer, idx);
      offersFragment.appendChild(nextOffer);
    });
    map.appendChild(offersFragment);

    window.offerCard.update(offersData[0].offer);

    mapPins = document.querySelectorAll('.pin');
    utils.forEach(mapPins, function (pinElem) {
      if (!pinElem.classList.contains('pin__main')) {
        pinElem.addEventListener('click', openOfferDetailsOnClick);
      }
      pinElem.addEventListener('keydown', openOfferDetailsFromKeyboard);
    });
    return true;
  }

  function openOfferDetailsOnClick(evt) {
    var pinElem = evt.target;
    if (pinElem.matches('img')) {
      pinElem = evt.target.parentElement;
    }
    var offerIdx = Number(pinElem.dataset.index);
    offerCard.show();
    deactivateAllPins();
    pin.activate(pinElem);
    offerCard.update(offersData[offerIdx].offer);
  }

  var map = document.querySelector('.tokyo__pin-map');
  var closeDialogBtn = document.querySelector('.dialog__close');
  var offersFragment = document.createDocumentFragment();

  var ENTER = 13;
  var ESCAPE = 27;
  var OFFERS_URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data';
  var offersData = [];
  var mapPins = [];

  loadOffers(OFFERS_URL, processResponse);

  closeDialogBtn.addEventListener('click', closeOfferDetails);
  document.addEventListener('keydown', closeOfferDetailsFromKeyboard);

})(window.utils, window.offerCard, window.loadOffers, window.pin, window.errorMessage);
