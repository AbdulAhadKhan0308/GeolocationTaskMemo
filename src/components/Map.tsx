import * as React from 'react';
import * as L from 'leaflet';
import { UnusedMarker, UsedMarker } from '../markers/MarkerClasses';
import { MapProps } from '../types';
import { useTasks } from './hooks/useTasksContext';

export const Map: React.FC<MapProps> = ({
  setFormVisible,
  formDateInputRef,
}) => {
  const { tasks } = useTasks();
  const [mapRef, setMapRef] = React.useState<L.Map | null>(null);

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

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }).addTo(map);

          // an unused marker is created
          new UnusedMarker(map, 0, 0);
          //render marker at unused position (if it was attached to map at a location and page was exited)
          UnusedMarker.instance?.attachToPrevMapCoords();

          map.on('click', function (mapEvent) {
            console.log('map clicked');
            setFormVisible(true);
            formDateInputRef.current?.focus();
            const { lat, lng } = mapEvent.latlng;
            UnusedMarker.instance?.attachToMapCoords(lat, lng);
          });

          setMapRef(map);
        },
        function () {
          alert(
            'Could not get your coordinates. Please allow location permission.'
          );
        }
      );
    }
  }, []);

  React.useEffect(() => {
    const usedMarkerRefs: UsedMarker[] = [];
    console.log('tasks in map', tasks);
    if (!mapRef) return;
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      usedMarkerRefs.push(
        new UsedMarker(
          mapRef,
          task.lat,
          task.lng,
          task.date,
          task.time,
          task.type
        )
      );
    }
    return () => {
      for (let i = 0; i < usedMarkerRefs.length; i++)
        usedMarkerRefs[i].removeFromMap();
    };
  }, [tasks, mapRef]);

  return <div id="map"></div>;
};
