import * as React from 'react';

export const TitleBox: React.FC = () => {
  return (
    <div className="titlebox">
      <img src="icon.png" alt="Logo" className="logo" />
      <h1 className="title">Tasks Memo</h1>
    </div>
  );
};
