import * as React from 'react';
import { Task } from '../../types';

export type TasksContextType = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

const tasksContext = React.createContext<TasksContextType | null>(null);

export const TasksContextProvider = tasksContext.Provider;

export const useTasks = () => {
  const context = React.useContext(tasksContext);
  if (!context) {
    throw new Error('task context false');
  }
  return context;
};
