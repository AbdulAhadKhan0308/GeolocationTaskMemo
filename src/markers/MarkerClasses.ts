import * as L from 'leaflet';
import { storageAvailable } from '../data/utilityFuncs';

class Marker {
  //this type of declarations are not part of js lang till now, but will probably be in future
  //supported in chrome
  // above comments are for `#varname` expressions
  readonly #map: L.Map;
  #lat: number;
  #lng: number;
  protected _markerPin: L.Marker | undefined;

  constructor(map: L.Map, lat: number, lng: number) {
    this.#map = map;
    this.#lat = lat;
    this.#lng = lng;
  }

  get lat(): number {
    return this.#lat;
  }
  get lng(): number {
    return this.#lng;
  }
  get map(): L.Map {
    return this.#map;
  }

  attachToMapCoords(lat: number, lng: number) {
    this.removeFromMap();
    const thisObj = globalThis?.L.marker.call(globalThis, [lat, lng]);
    this._markerPin = thisObj?.addTo.call(thisObj, this.#map);
    this.#lat = lat;
    this.#lng = lng;
  }
  removeFromMap() {
    this._markerPin?.remove();
  }
}

//singleton class
//class for marker not associated with any task
export class UnusedMarker extends Marker {
  public static instance: UnusedMarker | null = null;
  static #isOnMap = false;

  constructor(map: L.Map, lat: number, lng: number) {
    super(map, lat, lng);
    UnusedMarker.#isOnMap = true;
    if (UnusedMarker.instance instanceof UnusedMarker) {
      return UnusedMarker.instance;
    }
    UnusedMarker.instance = this;
    return UnusedMarker.instance;
  }

  private storeUnusedMarkerCoords() {
    if (UnusedMarker.instance?.lat && UnusedMarker.instance?.lng) {
      localStorage.setItem(
        'marker',
        `${UnusedMarker.instance?.lat},${UnusedMarker.instance?.lng}`
      );
    } else {
      localStorage.setItem('marker', `,`);
    }
  }

  attachToMapCoords(lat: number, lng: number) {
    super.attachToMapCoords(lat, lng);
    this.storeUnusedMarkerCoords();
    UnusedMarker.#isOnMap = true;
  }

  removeFromMap() {
    super.removeFromMap();
    UnusedMarker.#isOnMap = false;
  }

  attachToPrevMapCoords() {
    if (storageAvailable('localStorage')) {
      if (!localStorage.getItem('marker')) {
        localStorage.setItem('marker', ',');
        return;
      }

      const val = localStorage.getItem('marker');
      if (val === ',') return;

      let [lat, lng] = (val?.split(',') ?? ['', '']).map(Number.parseFloat);

      UnusedMarker.instance?.attachToMapCoords(lat, lng);
    }
  }

  static get isOnMap() {
    return UnusedMarker.#isOnMap;
  }
}

//marker with some task on it
//Used Marker = Marker+some popup data
export class UsedMarker extends Marker {
  public static total = 0;

  constructor(
    map: L.Map,
    lat: number,
    lng: number,
    date: any,
    time: any,
    type: any
  ) {
    super(map, lat, lng);
    UsedMarker.total++;
    this.attachPopUp(date, time, type);
  }

  attachPopUp(date: any, time: any, type: any) {
    this._markerPin
      ?.bindPopup(
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
