import * as React from 'react';
import { FormProps, Task } from '../types';
import { isValidDate, isValidTime, validateTasks } from '../data/utilityFuncs';
import { UnusedMarker } from '../markers/MarkerClasses';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTasks } from './hooks/useTasksContext';

export const Form: React.FC<FormProps> = ({
  formVisible,
  setFormVisible,
  formDateInputRef,
}) => {
  const [selectedOption, setSelectedOption] = React.useState<string>('study');
  const [formDateInputValue, setFormDateInputValue] =
    React.useState<string>('');
  const [formTimeInputValue, setFormTimeInputValue] =
    React.useState<string>('');
  const [formOtherInputValue, setFormOtherInputValue] =
    React.useState<string>('');
  const [formOtherLabelText, setFormOtherLabelText] =
    React.useState<string>('Course');
  const [formOtherPlaceholderText, setFormOtherPlaceholderText] =
    React.useState<string>('Yes/No');
  const handleSelectedChange = (e: React.SyntheticEvent) =>
    setSelectedOption((e.target as HTMLInputElement).value);
  const handleDateInputChange = (e: React.SyntheticEvent) =>
    setFormDateInputValue((e.target as HTMLInputElement).value);
  const handleTimeInputChange = (e: React.SyntheticEvent) =>
    setFormTimeInputValue((e.target as HTMLInputElement).value);
  const handleOtherInputChange = (e: React.SyntheticEvent) =>
    setFormOtherInputValue((e.target as HTMLInputElement).value);

  const { tasks } = useTasks();
  const { useSetItemsLocalStorage } = useLocalStorage();

  const modifyFormField = function (val: string) {
    if (val === 'study') {
      setFormOtherLabelText('Course');
      setFormOtherPlaceholderText('Yes/No');
    } else if (val === 'shop') {
      setFormOtherLabelText('Budget');
      setFormOtherPlaceholderText('in $');
    } else if (val === 'business-meet') {
      setFormOtherLabelText('Success');
      setFormOtherPlaceholderText('0 to 100%');
    } else if (val === 'friend-meet') {
      setFormOtherLabelText('Expenses');
      setFormOtherPlaceholderText('in $');
    } else if (val === 'workout') {
      setFormOtherLabelText('Calories Burnt');
      setFormOtherPlaceholderText('in cal');
    } else {
      setFormOtherLabelText('Comment');
      setFormOtherPlaceholderText('...');
    }
  };

  const handleClick = (e: React.SyntheticEvent<HTMLElement>) => {
    e.preventDefault();
    if (
      e.target instanceof HTMLButtonElement &&
      e.target.id === 'form-submit-btn'
    ) {
      if (!UnusedMarker.instance)
        throw new Error('UnusedMarker not instantiated');

      if (!(isValidTime(formTimeInputValue) && isValidDate(formDateInputValue)))
        throw new Error('date or time input invalid');

      const unusedMarker = UnusedMarker.instance;

      const date = formDateInputValue;
      const time = formTimeInputValue;
      const other = formOtherInputValue;
      const { lat, lng } = unusedMarker;
      const obj: any = {
        date,
        time,
        lat,
        lng,
      };

      if (selectedOption === 'study') {
        obj.type = 'Study';
        obj.course = other;
      } else if (selectedOption === 'other-task') {
        obj.type = 'OtherTask';
        obj.comment = other;
      } else {
        let otherNum;
        try {
          otherNum = parseInt(other);
        } catch (_e) {
          throw new Error('number input invalid');
        }
        if (selectedOption === 'shop') {
          obj.type = 'Shop';
          obj.budget = otherNum;
        } else if (selectedOption === 'business-meet') {
          obj.type = 'BusinessMeet';
          obj.success = otherNum;
        } else if (selectedOption === 'friend-meet') {
          obj.type = 'FriendMeet';
          obj.expenses = otherNum;
        } else if (selectedOption === 'workout') {
          obj.type = 'Workout';
          obj.caloriesBurnt = otherNum;
        }
      }

      console.log('obj', obj);
      if (!validateTasks([obj])) throw new Error('input invalid');

      // //store in localStorage
      // if (storageAvailable('localStorage')) {
      //   //for IDing objects
      //   const id = Date.now();
      //   localStorage.setItem(id, obj.JSONDataObj);
      // }

      const newTasks = [...tasks, obj as Task];
      useSetItemsLocalStorage('tasks', JSON.stringify(newTasks));
      setFormVisible(false);
      unusedMarker.removeFromMap();
    }
    if (
      e.target instanceof HTMLSelectElement &&
      e.target.id === 'form-input-type'
    ) {
      modifyFormField((e.target as HTMLSelectElement).value);
    }
  };

  return (
    formVisible && (
      <form className="form" onClick={handleClick}>
        <div className="form__row">
          <label className="form__label">Type</label>
          <select
            id="form-input-type"
            className="form__input form__input--type"
            value={selectedOption}
            onChange={handleSelectedChange}
          >
            <option value="study">Study</option>
            <option value="shop">Shop</option>
            <option value="business-meet">Business Meet</option>
            <option value="friend-meet">Friend Meet</option>
            <option value="workout">Workout</option>
            <option value="other-task">OtherTask</option>
          </select>
        </div>
        <div className="form__row">
          <label className="form__label">Date</label>
          <input
            ref={formDateInputRef}
            className="form__input form__input--date"
            placeholder="yyyy-mm-dd"
            value={formDateInputValue}
            onChange={handleDateInputChange}
          />
        </div>
        <div className="form__row">
          <label className="form__label">Time</label>
          <input
            className="form__input form__input--time"
            placeholder="hh:mm"
            value={formTimeInputValue}
            onChange={handleTimeInputChange}
          />
        </div>
        <div className="form__row">
          <label className="form__label form__label--other">
            {formOtherLabelText}
          </label>
          <input
            className="form__input form__input--other"
            placeholder={formOtherPlaceholderText}
            value={formOtherInputValue}
            onChange={handleOtherInputChange}
          />
        </div>
        <div className="form__btn__container">
          <button id="form-submit-btn" className="form__btn">
            OK
          </button>
        </div>
      </form>
    )
  );
};
