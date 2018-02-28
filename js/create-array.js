// модуль генерирует массив window.data.proposals, экспортируемый модулем data
'use strict';

(function () {
  window.createArray = function () {
    
  var time = '';
  var IMG_TEMPLATE = 'img/avatars/user0';
  var IMG_EXT = '.png';
  var photosArr = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

    window.utilities.sortArray(window.data.titles);

    for (var i = 0; i < window.data.titles.length; i++) {
      window.utilities.sortArray(photosArr);
      var featuresArr = [];
      for (var j = 0; j <= window.data.featuresArrCopy.length - 1; j++) {
        if (window.utilities.getRandomQuantity(1, 0)) {
          featuresArr.push(window.data.featuresArrCopy[j]);
        }
      }
    }
    window.data.proposals[i] = {
      author: {
        avatar: IMG_TEMPLATE + (i + 1) + IMG_EXT
      },
      offer: {
        title: window.data.titles[i],
        address: '',
        price: window.utilities.getRandomQuantity(1000000, 1000),
        type: window.utilities.checkType(window.data.titles[i]),
        rooms: window.utilities.getRandomQuantity(5, 1),
        guests: window.utilities.getRandomQuantity(10, 2),
        checkin: time = window.utilities.getRandomQuantity(14, 12) + ':00',
        checkout: time,
        features: featuresArr,
        description: '',
        photos: photosArr.slice(0, photosArr.length)
      },
      location: {
        x: window.utilities.getRandomQuantity(900, 300),
        y: window.utilities.getRandomQuantity(500, 150)
      }
    };
    window.data.proposals[i].offer.address = window.data.proposals[i].location.x + ', ' + window.data.proposals[i].location.y;
  } return window.data.proposals;
};
})();
