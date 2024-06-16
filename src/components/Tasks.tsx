import * as React from 'react';
import { Form } from './Form';
import { Memo } from './Memo';

export const Tasks: React.FC = () => {
  return (
    <ul className="tasks">
      <Form />
      <Memo />
    </ul>
  );
};
