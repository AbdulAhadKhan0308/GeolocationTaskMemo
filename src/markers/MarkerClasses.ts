import * as L from 'leaflet';

class Marker {
  //this type of declarations are not part of js lang till now, but will probably be in future
  //supported in chrome
  #Lvar: L;
  #map: L.Map;
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
