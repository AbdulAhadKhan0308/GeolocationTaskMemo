export const isValidDate = function (date) {
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
