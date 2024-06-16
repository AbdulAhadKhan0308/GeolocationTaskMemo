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

class Marker {
  //this type of declarations are not part of js lang till now, but will probably be in future
  //supported in chrome
  #Lvar;
  #map;
  #lat;
  #lng;
  constructor(Lvar, map, lat, lng) {
    this.#Lvar = Lvar;
    this.#map = map;
    this.attachToMapCoords(lat, lng);
  }
  get lat() {
    return this.#lat;
  }
  get lng() {
    return this.#lng;
  }
  get Lvar() {
    return this.#Lvar;
  }
  get map() {
    return this.#map;
  }
  attachToMapCoords(lat, lng) {
    this.#lat = lat;
    this.#lng = lng;
    const thisObj = this.#Lvar.marker.call(globalThis, [lat, lng]);
    this.markerPin = thisObj.addTo.call(thisObj, this.#map);
  }
  removeFromMap() {
    this.markerPin.remove();
  }
}

//singleton class
//class for marker not associated with any task
class UnusedMarker extends Marker {
  static instance = null;
  static #isOnMap = false;
  constructor(Lvar, map, lat, lng) {
    super(Lvar, map, lat, lng);
    UnusedMarker.#isOnMap = true;
    if (UnusedMarker.instance instanceof UnusedMarker) {
      return UnusedMarker.instance;
    }
    UnusedMarker.instance = this;
    return UnusedMarker.instance;
  }
  attachToMapCoords(lat, lng) {
    super.attachToMapCoords(lat, lng);
    UnusedMarker.#isOnMap = true;
  }
  removeFromMap() {
    super.removeFromMap();
    UnusedMarker.#isOnMap = false;
  }

  static get isOnMap() {
    return UnusedMarker.#isOnMap;
  }
}

//marker with some task on it
//Used Marker = Marker+some popup data
class UsedMarker extends Marker {
  static total = 0;

  constructor(Lvar, map, lat, lng, date, time, type) {
    super(Lvar, map, lat, lng);
    UsedMarker.total++;
    this.attachPopUp(date, time, type);
  }
  attachPopUp(date, time, type) {
    this.markerPin
      .bindPopup(
        L.popup({
          autoClose: false,
          closeOnClick: false,
          className: `${type}-popup`,
        })
      )
      .setPopupContent(`on ${date} at ${time}`)
      .openPopup();
  }
}


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

const isValidDate = function (date) {
  if (date.length > 10 || date.length < 10) return false;

  let i = 0;
  for (i = 0; i < date.length; i++) {
    if (i != 4 && i != 7 && !date.charAt(i).match(/[0-9]/)) break;
  }
  if (i != date.length) return false;

  const dateOnly = parseInt(date.slice(8, 10));
  const month = parseInt(date.slice(5, 7));
  const year = parseInt(date.slice(0, 4));

  if (year > 2050 || year < 1950 || month > 12 || month < 1) return false;
  if (month != 2) {
    if ((month % 2 && month < 8) || (month % 2 == 0 && month > 7)) {
      if (dateOnly < 1 || dateOnly > 31) return false;
    } else {
      if (dateOnly < 1 || dateOnly > 30) return false;
    }
  }
  if (month == 2) {
    if (
      (year % 4 && (dateOnly < 1 || dateOnly > 28)) ||
      (year % 4 == 0 && (dateOnly < 1 || dateOnly > 29))
    )
      return false;
  }
  return true;
};

//LOCAL STORAGE
//////////////////////////////////////////////////////
function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return false;
  }
}

const renderList = function () {
  //remove previous elements in memo
  const elemarr = document.querySelectorAll('.task');
  elemarr.forEach(elem => elem.remove());

  globalUsedMarkersArray.forEach(usedMarker => {
    usedMarker.removeFromMap();
  });
  globalUsedMarkersArray = [];

  //retrieve elements form localStorage and insert in memoElem
  console.log("localStorage.length",localStorage.length);

  for (let i = 0; i < localStorage.length; i++) {
    const keyCol = localStorage.key(i);
    console.log("keyCol",keyCol);

    if (keyCol !== 'marker') {
      console.log("no marker")
      const obj = JSON.parse(localStorage.getItem(keyCol));
      console.log("obj",obj);
      const { date, time, lat, lng, className } = obj;
      console.log("className",className);

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

const modifyStorageValueOfUnusedMarker = function () {
  if (!UnusedMarker.isOnMap) {
    localStorage.setItem('marker', ',');
  } else
    localStorage.setItem(
      'marker',
      `${UnusedMarker.instance.lat},${UnusedMarker.instance.lng}`
    );
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

form.addEventListener('click', e => {
  e.preventDefault();
  if (e.target === formBtn) {
    const timeReg = /^(([0-1][0-9])|([2][0-3])):[0-5][0-9]$/g;

    if (timeInput.value.match(timeReg) && isValidDate(dateInput.value)) {
      const unusedMarker = UnusedMarker.instance;
      //create obj
      let obj;
      const date = dateInput.value;
      const time = timeInput.value;
      const other = formInputOther.value;
      const { lat, lng } = unusedMarker;

      if (formInputType.value === 'study')
        obj = new Study(date, time, lat, lng, other);
      else if (formInputType.value === 'shop')
        obj = new Shop(date, time, lat, lng, other);
      else if (formInputType.value === 'business-meet')
        obj = new BusinessMeet(date, time, lat, lng, other);
      else if (formInputType.value === 'friend-meet')
        obj = new FriendMeet(date, time, lat, lng, other);
      else if (formInputType.value === 'workout')
        obj = new Workout(date, time, lat, lng, other);
      else obj = new OtherTask(date, time, lat, lng, other);

      //store in localStorage
      if (storageAvailable('localStorage')) {
        //for IDing objects
        const id = Date.now();
        localStorage.setItem(id, obj.JSONDataObj);
      }

      form.classList.add('hidden');
      //render from localStorage
      renderList();

      unusedMarker.removeFromMap();
      modifyStorageValueOfUnusedMarker();
    }
  }
  if (e.target === formInputType) {
    modifyOtherLabel(e.target.value);
  }
});

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
