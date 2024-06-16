export type SideBarProps = {
  formVisible: boolean;
  formDateInputRef: React.RefObject<HTMLInputElement>;
  // //   setFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
  // //   setDateInputFocused: React.Dispatch<React.SetStateAction<boolean>>;
};

export type MapProps = {
  setFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
  formDateInputRef: React.RefObject<HTMLInputElement>;
};

export type TasksProps = {
  formVisible: boolean;
  formDateInputRef: React.RefObject<HTMLInputElement>;
};

export type FormProps = {
  formVisible: boolean;
  formDateInputRef: React.RefObject<HTMLInputElement>;
};
