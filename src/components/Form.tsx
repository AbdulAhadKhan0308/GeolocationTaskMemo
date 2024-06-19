import * as React from 'react';
import { FormProps } from '../types';
import { isValidDate } from '../data/utilityFuncs';
import { UnusedMarker } from '../markers/MarkerClasses';
import {
  BusinessMeet,
  FriendMeet,
  OtherTask,
  Shop,
  Study,
  Workout,
} from '../data/taskClasses';

export const Form: React.FC<FormProps> = ({
  formVisible,
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

  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if ((e.target as HTMLElement).id === 'form-submit-btn') {
      // const timeReg = /^(([0-1][0-9])|([2][0-3])):[0-5][0-9]$/g;
      // if (!UnusedMarker.instance)
      //   throw new Error('UnusedMarker not instantiated');
      // if (
      //   formTimeInputValue.match(timeReg) &&
      //   isValidDate(formDateInputValue)
      // ) {
      //   const unusedMarker = UnusedMarker.instance;
      //   //create obj
      //   let obj;
      //   const date = formDateInputValue;
      //   const time = formTimeInputValue;
      //   const other = formOtherInputValue;
      //   const { lat, lng } = unusedMarker;
      //   if (selectedOption === 'study')
      //     obj = new Study(date, time, lat, lng, other);
      //   else if (selectedOption === 'shop')
      //     obj = new Shop(date, time, lat, lng, other);
      //   else if (selectedOption === 'business-meet')
      //     obj = new BusinessMeet(date, time, lat, lng, other);
      //   else if (selectedOption === 'friend-meet')
      //     obj = new FriendMeet(date, time, lat, lng, other);
      //   else if (selectedOption === 'workout')
      //     obj = new Workout(date, time, lat, lng, other);
      //   else obj = new OtherTask(date, time, lat, lng, other);
      //   // //store in localStorage
      //   // if (storageAvailable('localStorage')) {
      //   //   //for IDing objects
      //   //   const id = Date.now();
      //   //   localStorage.setItem(id, obj.JSONDataObj);
      //   // }
      //   // form.classList.add('hidden');
      //   // //render from localStorage
      //   // renderList();
      //   // unusedMarker.removeFromMap();
      //   // modifyStorageValueOfUnusedMarker();
      // }
    }
    if ((e.target as HTMLSelectElement).id === 'form-input-type') {
      modifyFormField((e.target as HTMLSelectElement).value);
      console.log('inputtype clicked');
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
