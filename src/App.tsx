import * as React from 'react';
import { SideBar } from './components/SideBar';
import { Map } from './components/Map';

export const App: React.FC = () => {
  return (
    <>
      <div id="first-child">{'hi in reacted'}</div>
      <SideBar />
      <Map />
    </>
  );
};
