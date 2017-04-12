'use strict';

(function (utils, offerCard, offersData, pin) {

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

  function moveLocationSelector(evt) {
    if (!isDragging) {
      return false;
    }
    var pinElem = evt.target;
    if (pinElem.matches('img')) {
      pinElem = evt.target.parentElement;
    }
    evt.target.style.top = (evt.pageY - mapContainer.offsetTop - locationSelector.offsetHeight / 2) + 'px';
    evt.target.style.left = (evt.pageX - mapContainer.offsetLeft - locationSelector.offsetWidth / 2) + 'px';
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
  var isDragging = false;

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

  locationSelector.addEventListener('mousedown', enableDrag);
  locationSelector.addEventListener('mouseup', disableDrag);
  locationSelector.addEventListener('mouseleave', disableDrag);

  locationSelector.addEventListener('mousemove', moveLocationSelector);

})(window.utils, window.offerCard, window.offersData, window.pin);
