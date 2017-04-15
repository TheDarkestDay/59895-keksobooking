'use strict';

(function (utils, offerCard, pin, form, errorMessage, loadOffers) {

  function openOfferDetailsFromKeyboard(evt) {
    if (evt.keyCode === ENTER) {
      openOfferDetailsOnClick(evt);
    }
  }

  function enableDrag(evt) {
    evt.preventDefault();
    isDragging = true;
  }

  function disableDrag() {
    isDragging = false;
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

  function processResponse(response, error) {
    if (error) {
      errorMessage.display(error);
      return;
    }
    offersData = response;

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
  }

  function moveLocationSelector(evt) {
    if (!isDragging) {
      return false;
    }
    var pinElem = evt.target;
    if (pinElem.matches('img')) {
      pinElem = evt.target.parentElement;
    }
    var pinPointerX = evt.pageX - mapContainer.offsetLeft - locationSelector.offsetWidth / 2;
    var pinPointerY = evt.pageY - mapContainer.offsetTop;
    var pinCenterX = pinPointerX;
    var pinCenterY = pinPointerY - locationSelector.offsetHeight / 2;
    evt.target.style.left = pinCenterX + 'px';
    evt.target.style.top = pinCenterY + 'px';
    form.updateLocation(pinPointerX, pinPointerY);
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

  var mapContainer = document.querySelector('.tokyo');
  var map = mapContainer.querySelector('.tokyo__pin-map');
  var locationSelector = map.querySelector('.pin__main');
  var closeDialogBtn = document.querySelector('.dialog__close');
  var offersFragment = document.createDocumentFragment();

  var ENTER = 13;
  var ESCAPE = 27;
  var OFFERS_URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data';
  var offersData = [];
  var mapPins = [];

  loadOffers(OFFERS_URL, processResponse);

  var isDragging = false;

  closeDialogBtn.addEventListener('click', closeOfferDetails);
  document.addEventListener('keydown', closeOfferDetailsFromKeyboard);

  locationSelector.addEventListener('mousedown', enableDrag);
  locationSelector.addEventListener('mouseup', disableDrag);
  locationSelector.addEventListener('mouseleave', disableDrag);

  locationSelector.addEventListener('mousemove', moveLocationSelector);

})(window.utils, window.offerCard, window.pin, window.form, window.errorMessage, window.loadOffers);
