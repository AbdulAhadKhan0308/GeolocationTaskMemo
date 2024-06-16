import * as React from 'react';
import { TitleBox } from './TitleBox';
import { CopyRight } from './CopyRight';
import { Tasks } from './Tasks';
import type { SideBarProps } from '../types';

export const SideBar: React.FC<SideBarProps> = ({
  formVisible,
  formDateInputRef,
}) => {
  return (
    <div className="sidebar">
      <TitleBox />
      <Tasks formVisible={formVisible} formDateInputRef={formDateInputRef} />
      <CopyRight />
    </div>
  );
};
