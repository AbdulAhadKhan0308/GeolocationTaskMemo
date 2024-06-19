'use strict';

const form = document.querySelector('.form');
const dateInput = document.querySelector('.form__input--date');
const timeInput = document.querySelector('.form__input--time');
const formBtn = document.querySelector('.form__btn');
const formInputType = document.querySelector('.form__input--type');
const formLabelOther = document.querySelector('.form__label--other');
const formInputOther = document.querySelector('.form__input--other');
const memoElem = document.querySelector('.memo');
let globalUsedMarkersArray = [];
//////////////////////////////////////////////

///////////////////////////////////////////
//could be done with a "visible class" from css for the "other" form field that appears only one one of them
const modifyOtherLabel = function (val) {
  if (val === 'study') {
    formLabelOther.innerHTML = 'Course';
    formInputOther.placeholder = 'Yes/No';
  } else if (val === 'shop') {
    formLabelOther.innerHTML = 'Budget';
    formInputOther.placeholder = 'in $';
  } else if (val === 'business-meet') {
    formLabelOther.innerHTML = 'Success';
    formInputOther.placeholder = '0 to 100%';
  } else if (val === 'friend-meet') {
    formLabelOther.innerHTML = 'Expenses';
    formInputOther.placeholder = 'in $';
  } else if (val === 'workout') {
    formLabelOther.innerHTML = 'Calories Burnt';
    formInputOther.placeholder = 'in cal';
  } else {
    formLabelOther.innerHTML = 'Comment';
    formInputOther.placeholder = '...';
  }
};

//LOCAL STORAGE
//////////////////////////////////////////////////////

const renderList = function () {
  //remove previous elements in memo
  const elemarr = document.querySelectorAll('.task');
  elemarr.forEach(elem => elem.remove());

  globalUsedMarkersArray.forEach(usedMarker => {
    usedMarker.removeFromMap();
  });
  globalUsedMarkersArray = [];

  //retrieve elements form localStorage and insert in memoElem
  console.log('localStorage.length', localStorage.length);

  for (let i = 0; i < localStorage.length; i++) {
    const keyCol = localStorage.key(i);
    console.log('keyCol', keyCol);

    if (keyCol !== 'marker') {
      console.log('no marker');
      const obj = JSON.parse(localStorage.getItem(keyCol));
      console.log('obj', obj);
      const { date, time, lat, lng, className } = obj;
      console.log('className', className);

      let OtherProperty = Object.values(obj)[5];
      if (!OtherProperty) OtherProperty = '';

      let title = className;
      if (className === 'BusinessMeet') title = 'Business Meet';
      if (className === 'FriendMeet') title = 'Friend Meet';
      if (className == 'OtherTask') title = 'Other Task';

      const type = title.toLowerCase().replace(' ', '-');

      memoElem.insertAdjacentHTML(
        'afterbegin',
        `<div class="task task--${type}" data-id=${keyCol}>
      <div class="task__title">
      <div class="task__title--name">${title}</div>
      <div class="task__title--cross">&#10060;</div>
      </div>
      <div class="task__details">
        <span class="task__date">${date}</span>
        <span class="task__time">${time}</span>
        <span class="task__other">${OtherProperty}</span>
        </div>
      </div>`
      );

      const usedMarker = new UsedMarker(
        UnusedMarker.instance.Lvar,
        UnusedMarker.instance.map,
        lat,
        lng,
        date,
        time,
        type
      );
      globalUsedMarkersArray.push(usedMarker);
    }
  }
};

const renderUnusedMarker = function () {
  if (storageAvailable('localStorage')) {
    if (!localStorage.getItem('marker')) {
      localStorage.setItem('marker', ',');
      return;
    }

    const val = localStorage.getItem('marker');
    if (val === ',') return;

    let [lat, lng] = val.split(',');
    lat = Number.parseFloat(lat);
    lng = Number.parseFloat(lng);

    UnusedMarker.instance.removeFromMap();
    UnusedMarker.instance.attachToMapCoords(lat, lng);
  }
};

//////////////////////////////////////////

if (navigator && navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (positionObj) {
      const { latitude } = positionObj.coords;
      const { longitude } = positionObj.coords;
      const coords = [latitude, longitude];

      const map = L.map('map').setView(coords, 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      //an unused marker is created and taken off the map
      new UnusedMarker(L, map, 0, 0);
      UnusedMarker.instance.removeFromMap();
      //render marker at unused position (if it was attached to map at a location and page was exited)
      renderUnusedMarker();

      //render if some list objects were there in local storage
      renderList();

      map.on('click', function (mapEvent) {
        form.classList.remove('hidden');
        dateInput.focus();

        const { lat, lng } = mapEvent.latlng;

        UnusedMarker.instance.removeFromMap();
        UnusedMarker.instance.attachToMapCoords(lat, lng);

        modifyStorageValueOfUnusedMarker();
      });
    },
    function () {
      alert(
        'Could not get your coordinates. Please allow location permission.'
      );
    }
  );
}

// form.addEventListener('click',
// });

memoElem.addEventListener('click', e => {
  e.preventDefault();
  if (e.target.classList.contains('memo')) return;

  if (e.target.classList.contains('task__title--cross')) {
    localStorage.removeItem(e.target.closest('.task').dataset.id);
    renderList();
  } else {
    const { lat, lng } = JSON.parse(
      localStorage.getItem(e.target.closest('.task').dataset.id)
    );
    //used to access map object which we stored in UnuseMarker instance
    UnusedMarker.instance.map.setView([lat, lng], 13);
  }
});
