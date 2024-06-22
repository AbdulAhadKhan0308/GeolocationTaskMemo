import * as React from 'react';
import { SideBar } from './components/SideBar';
import { Map } from './components/Map';
import { Task } from './types';
import { TasksContextProvider } from './components/hooks/useTasksContext';

export const App: React.FC = () => {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [formVisible, setFormVisible] = React.useState<boolean>(false);
  const formDateInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <>
      <TasksContextProvider value={{ tasks, setTasks }}>
        <SideBar
          setFormVisible={setFormVisible}
          formVisible={formVisible}
          formDateInputRef={formDateInputRef}
        />
        <Map
          setFormVisible={setFormVisible}
          formDateInputRef={formDateInputRef}
        />
      </TasksContextProvider>
    </>
  );
};
