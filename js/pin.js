'use strict';

window.pin = (function () {

  return {
    deactivate: function (pinElem) {
      pinElem.classList.remove('pin--active');
    },
    activate: function (pinElem) {
      pinElem.classList.add('pin--active');
    },
    render: function (offer, idx) {
      var pinWrapper = document.createElement('div');
      var pinImg = document.createElement('img');
      pinWrapper.classList.add('pin');
      pinWrapper.dataset.index = idx;
      pinWrapper.style.left = offer.location.x + 'px';
      pinWrapper.style.top = offer.location.y + 'px';
      pinImg.src = offer.author.avatar;
      pinImg.tabIndex = '0';
      pinWrapper.appendChild(pinImg);
      return pinWrapper;
    }
  };
})();
