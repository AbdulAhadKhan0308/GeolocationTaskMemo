import * as React from 'react';
import { Form } from './Form';
import { Memo } from './Memo';
import type { TasksProps } from '../types';

export const Tasks: React.FC<TasksProps> = ({
  formVisible,
  formDateInputRef,
}) => {
  return (
    <ul className="tasks">
      <Form formVisible={formVisible} formDateInputRef={formDateInputRef} />
      <Memo />
    </ul>
  );
};
