import * as React from 'react';
import * as L from 'leaflet';
import { UnusedMarker } from '../markers/MarkerClasses';
import { MapProps } from '../types';

export const Map: React.FC<MapProps> = ({
  setFormVisible,
  formDateInputRef,
}) => {
  React.useEffect(() => {
    if (navigator?.geolocation) {
      console.log('navigator.geolocation exists');
      navigator.geolocation.getCurrentPosition(
        function (positionObj) {
          const { latitude } = positionObj.coords;
          const { longitude } = positionObj.coords;
          const coords = [latitude, longitude];
          console.log('coords', coords);
          const map = L.map('map').setView(coords as L.LatLngExpression, 13);
          console.log('map', map);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }).addTo(map);

          // an unused marker is created
          new UnusedMarker(map, 0, 0);
          //render marker at unused position (if it was attached to map at a location and page was exited)
          UnusedMarker.instance?.attachToPrevMapCoords();

          // //render if some list objects were there in local storage
          // renderList();

          map.on('click', function (mapEvent) {
            console.log('map clicked');
            setFormVisible(true);
            formDateInputRef.current?.focus();
            const { lat, lng } = mapEvent.latlng;
            UnusedMarker.instance?.attachToMapCoords(lat, lng);
          });
        },
        function () {
          alert(
            'Could not get your coordinates. Please allow location permission.'
          );
        }
      );
    }
  }, []);
  return <div id="map"></div>;
};
