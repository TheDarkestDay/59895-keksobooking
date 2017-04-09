'use strict';

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
  displayOfferDetails(window.offersData[offerIdx].offer, lodgeTemplate);
}

function deactivateAllPins(pins) {
  window.utils.forEach(pins, function (pin) {
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

var ENTER = 13;
var ESCAPE = 27;

var offersFragment = document.createDocumentFragment();
window.offersData.forEach(function (offer, idx) {
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

displayOfferDetails(window.offersData[0].offer, lodgeTemplate);

var mapPins = document.querySelectorAll('.pin');
var closeDialogBtn = offerDialog.querySelector('.dialog__close');

window.utils.forEach(mapPins, function (pin) {
  pin.addEventListener('click', openOfferDetails);
  pin.addEventListener('keydown', openOfferDetailsFromKeyboard);
});

closeDialogBtn.addEventListener('click', closeOfferDialog);

document.addEventListener('keydown', closeOfferDialogFromKeyboard);
