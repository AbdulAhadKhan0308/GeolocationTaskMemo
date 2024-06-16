import * as React from 'react';

export const CopyRight: React.FC = () => {
  return (
    <p className="copyright">
      &copy; Copyright by
      <a
        className="twitter-link"
        target="_blank"
        href="https://twitter.com/jonasschmedtman"
      >
        Jonas Schmedtmann
      </a>
    </p>
  );
};
