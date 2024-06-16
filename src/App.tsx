import * as React from 'react';
import { SideBar } from './components/SideBar';
import { Map } from './components/Map';
import * as L from 'leaflet';

export const App: React.FC = () => {
  React.useEffect(() => {
    if (navigator?.geolocation) {
      console.log('navigator.geolocation exists');
      navigator.geolocation.getCurrentPosition(
        function (positionObj) {
          const { latitude } = positionObj.coords;
          const { longitude } = positionObj.coords;
          const coords = [latitude, longitude];
          console.log('coords', coords);
          const map = L.map('map').setView(coords as any, 13);
          console.log('map', map);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }).addTo(map);

          //an unused marker is created and taken off the map
          // new UnusedMarker(L, map, 0, 0);
          // UnusedMarker.instance.removeFromMap();
          // //render marker at unused position (if it was attached to map at a location and page was exited)
          // renderUnusedMarker();

          // //render if some list objects were there in local storage
          // renderList();

          map.on('click', function (mapEvent) {
            console.log('map clicked');
            //   form.classList.remove('hidden');
            //   dateInput.focus();
            //   const { lat, lng } = mapEvent.latlng;
            //   UnusedMarker.instance.removeFromMap();
            //   UnusedMarker.instance.attachToMapCoords(lat, lng);
            //   modifyStorageValueOfUnusedMarker();
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

  return (
    <>
      <div id="first-child">{'hi in reacted'}</div>
      <SideBar />
      <Map />
    </>
  );
};
