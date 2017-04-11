'use strict';

window.offerCard = (function () {

  var template = document.querySelector('#lodge-template').content;
  var offerDialog = document.querySelector('#offer-dialog');

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

  function update(offer) {
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

  function show(evt) {
    if (offerDialog.style.display === 'none') {
      offerDialog.style.display = 'block';
    }
  }

  function close() {
    offerDialog.style.display = 'none';
  }

  return {
    update: update,
    show: show,
    close: close
  };
})();
