import * as React from 'react';
import { TitleBox } from './TitleBox';
import { CopyRight } from './CopyRight';
import { Tasks } from './Tasks';

export const SideBar: React.FC = () => {
  return (
    <div className="sidebar">
      <TitleBox />
      <Tasks />
      <CopyRight />
    </div>
  );
};
