'use strict';

window.map = (function (utils, offerCard, offersData, pin) {

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

  window.offersData.forEach(function (offer, idx) {
    var nextOffer = pin.render(offer, idx);
    offersFragment.appendChild(nextOffer);
  });
  map.appendChild(offersFragment);

  window.offerCard.update(offersData[0].offer);

  var mapPins = document.querySelectorAll('.pin');
  utils.forEach(mapPins, function (pinElem) {
    pinElem.addEventListener('click', openOfferDetailsOnClick);
    pinElem.addEventListener('keydown', openOfferDetailsFromKeyboard);
  });

  closeDialogBtn.addEventListener('click', closeOfferDetails);
  document.addEventListener('keydown', closeOfferDetailsFromKeyboard);

})(window.utils, window.offerCard, window.offersData, window.pin);
