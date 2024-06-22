export type SideBarProps = {
  formVisible: boolean;
  setFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
  formDateInputRef: React.RefObject<HTMLInputElement>;
  // //   setDateInputFocused: React.Dispatch<React.SetStateAction<boolean>>;
};

export type MapProps = {
  setFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
  formDateInputRef: React.RefObject<HTMLInputElement>;
};

export type TasksProps = {
  formVisible: boolean;
  setFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
  formDateInputRef: React.RefObject<HTMLInputElement>;
};

export type FormProps = {
  formVisible: boolean;
  setFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
  formDateInputRef: React.RefObject<HTMLInputElement>;
};

type TaskType =
  | 'Study'
  | 'Shop'
  | 'BusinessMeet'
  | 'FriendMeet'
  | 'Workout'
  | 'OtherTask';
export type TaskInternal = {
  type: TaskType;
  date: string;
  time: string;
  lat: number;
  lng: number;
};
type StudyType = TaskInternal & { type: 'Study'; course: 'Yes' | 'No' };
type ShopType = TaskInternal & { type: 'Shop'; budget: number };
type BusinessMeetType = TaskInternal & {
  type: 'BusinessMeet';
  success: number;
};
type FriendMeetType = TaskInternal & {
  type: 'FriendMeet';
  expenses: number;
};
type WorkoutType = TaskInternal & {
  type: 'Workout';
  caloriesBurnt: number;
};
type OtherTaskType = TaskInternal & {
  type: 'OtherTask';
  comment: string;
};
export type Task =
  | StudyType
  | ShopType
  | BusinessMeetType
  | FriendMeetType
  | WorkoutType
  | OtherTaskType;
