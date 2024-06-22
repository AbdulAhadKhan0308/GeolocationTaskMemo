// date is string in yyyy-mm-dd
export const isValidDate = function (date: string) {
  if (date.length > 10 || date.length < 10) return false;

  let i = 0;
  for (i = 0; i < date.length; i++) {
    if (i != 4 && i != 7 && !date.charAt(i).match(/[0-9]/)) break;
  }
  if (i != date.length) return false;

  const dateOnly = parseInt(date.slice(8, 10));
  const month = parseInt(date.slice(5, 7));
  const year = parseInt(date.slice(0, 4));

  if (year > 2050 || year < 1950 || month > 12 || month < 1) return false;
  if (month != 2) {
    if ((month % 2 && month < 8) || (month % 2 == 0 && month > 7)) {
      if (dateOnly < 1 || dateOnly > 31) return false;
    } else {
      if (dateOnly < 1 || dateOnly > 30) return false;
    }
  }
  if (month == 2) {
    if (
      (year % 4 && (dateOnly < 1 || dateOnly > 28)) ||
      (year % 4 == 0 && (dateOnly < 1 || dateOnly > 29))
    )
      return false;
  }
  return true;
};

//valid input woud be hh:mm format
export function isValidTime(time: string) {
  const timeRegex = /^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/;
  return timeRegex.test(time);
}

export function storageAvailable(type: 'localStorage' | 'sessionStorage') {
  let storage;
  try {
    storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return false;
  }
}

export const validateTasks: (tasks: any) => boolean = tasks => {
  if (!Array.isArray(tasks)) return false;

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    if (
      !(
        task?.date &&
        typeof task.date === 'string' &&
        task?.time &&
        typeof task.time === 'string'
      )
    )
      return false;

    switch (task?.type) {
      case 'Study':
        if (!(task?.course === 'Yes' || task?.course === 'No')) return false;
        continue;
      case 'Shop':
        if (!(task?.budget && typeof task.budget === 'number')) return false;
        continue;
      case 'BusinessMeet':
        if (!(task?.success && typeof task.success === 'number')) return false;
        continue;
      case 'FriendMeet':
        if (!(task?.expenses && typeof task.expenses === 'number'))
          return false;
        continue;
      case 'Workout':
        if (!(task?.caloriesBurnt && typeof task.caloriesBurnt === 'number'))
          return false;
        continue;
      case 'OtherTask':
        if (!(task?.comment && typeof task.comment === 'string')) return false;
        continue;
      default:
        return false;
    }
  }
  return true;
};
