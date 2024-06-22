import * as React from 'react';
import { useTasks } from './hooks/useTasksContext';
import { useLocalStorage } from './hooks/useLocalStorage';
import { UnusedMarker } from '../markers/MarkerClasses';

export const Memo: React.FC = () => {
  const { tasks, setTasks } = useTasks();

  const handleClickIndex = (e: React.SyntheticEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();

    if (
      e.target instanceof HTMLElement &&
      e.target.classList.contains('task__title--cross')
    ) {
      const { useSetItemsLocalStorage } = useLocalStorage();
      const newTasks = tasks.filter((_task, index) => !(index === id));
      useSetItemsLocalStorage('tasks', JSON.stringify(newTasks));
      setTasks(newTasks);
    } else {
      const task = tasks.find((_task, index) => index === id);
      if (task) {
        UnusedMarker.instance?.map.setView([task.lat, task.lng], 13);
      }
    }
  };

  return (
    <div className="memo">
      {tasks.map((task, index) => {
        const other =
          task.type === 'Study'
            ? task.course
            : task.type === 'Shop'
            ? task.budget
            : task.type === 'BusinessMeet'
            ? task.success
            : task.type === 'FriendMeet'
            ? task.expenses
            : task.type === 'Workout'
            ? task.caloriesBurnt
            : task.comment;
        const handleClick = (e: React.SyntheticEvent) =>
          handleClickIndex(e, index);

        return (
          <>
            <div className="task task--default" onClick={handleClick}>
              <div className="task__title">
                <div className="task__title--name">{task.type}</div>
                <div className="task__title--cross" onClick={handleClick}>
                  &#10060;
                </div>
              </div>
              <div className="task__details">
                <span className="task__date">{task.date}</span>
                <span className="task__time">{task.time}</span>
                <span className="task__other">{other}</span>
              </div>
            </div>
          </>
        );
      })}

      {/* <div className="task task--study">
      <div className="task__title">
        <div className="task__title--name">Study</div>
        <div className="task__title--cross">&#10060;</div>
      </div>
      <div className="task__details">
        <span className="task__date">2020-08-09</span>
        <span className="task__time">22:45</span>
        <span className="task__other">Do work</span>
      </div>
    </div> */}
    </div>
  );
};
