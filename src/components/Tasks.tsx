import * as React from 'react';
import { Form } from './Form';
import { Memo } from './Memo';
import type { Task, TasksProps } from '../types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { validateTasks } from '../data/utilityFuncs';
import { useTasks } from './hooks/useTasksContext';

export const Tasks: React.FC<TasksProps> = ({
  formVisible,
  setFormVisible,
  formDateInputRef,
}) => {
  const { useGetItemsFromLocalStorage } = useLocalStorage();
  const { setTasks } = useTasks();
  const parseValidateTaskItems: (
    stringifiedTasks: string
  ) => Task[] | false = stringifiedTasks => {
    try {
      const unvalidatedTasks = JSON.parse(stringifiedTasks);
      return validateTasks(unvalidatedTasks) && unvalidatedTasks;
    } catch (_e) {
      return false;
    }
  };

  React.useEffect(() => {
    const items = useGetItemsFromLocalStorage('tasks');
    console.log('items', items);
    const taskItems = !!items && parseValidateTaskItems(items);
    console.log('taskItems', taskItems);
    if (taskItems) setTasks(taskItems);
    else throw new Error('taskItems is invalid');
  }, [formVisible]);

  return (
    <ul className="tasks">
      <Form
        formVisible={formVisible}
        setFormVisible={setFormVisible}
        formDateInputRef={formDateInputRef}
      />
      <Memo />
    </ul>
  );
};
