import * as React from 'react';

export const Form: React.FC = () => {
  return (
    <form className="form hidden">
      <div className="form__row">
        <label className="form__label">Type</label>
        <select className="form__input form__input--type">
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
          className="form__input form__input--date"
          placeholder="yyyy-mm-dd"
        />
      </div>
      <div className="form__row">
        <label className="form__label">Time</label>
        <input className="form__input form__input--time" placeholder="hh:mm" />
      </div>
      <div className="form__row">
        <label className="form__label form__label--other">Course</label>
        <input
          className="form__input form__input--other"
          placeholder="Yes/No"
        />
      </div>

      <div className="form__btn__container">
        <button className="form__btn">OK</button>
      </div>
    </form>
  );
};
