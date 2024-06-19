import * as React from 'react';
import { SideBar } from './components/SideBar';
import { Map } from './components/Map';

export const App: React.FC = () => {
  const [formVisible, setFormVisible] = React.useState<boolean>(false);
  const formDateInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <>
      <div id="first-child">{'hihi changed in reacted'}</div>
      <SideBar formVisible={formVisible} formDateInputRef={formDateInputRef} />
      <Map
        setFormVisible={setFormVisible}
        formDateInputRef={formDateInputRef}
      />
    </>
  );
};
