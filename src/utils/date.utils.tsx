export const getNameOfMonth = (month: number): string | undefined => {
  const datesMap = new Map<number, string>();
  datesMap.set(1, "January");
  datesMap.set(12, "December");

  return datesMap.get(month);
};

export const getTodayDate = (): string => {
  const date = new Date();

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};

export const compareDate = (date: Date, date2: Date): boolean => {
  return (
    date.getDate() === date2.getDate() &&
    date.getMonth() === date2.getMonth() &&
    date.getFullYear() === date2.getFullYear()
  );
};

export const getDifferenceBetweenTwoDates = (
  date: Date,
  date2: Date
): string => {
  let differenceInMilliseconds = date.getTime() - date2.getTime();
  differenceInMilliseconds =
    differenceInMilliseconds < 0
      ? differenceInMilliseconds * -1
      : differenceInMilliseconds;

  const differenceInSeconds = differenceInMilliseconds / 1000;
  const differenceInMinutes = differenceInSeconds / 60;
  const differenceInHours = differenceInMinutes / 60;
  const differenceInDays = differenceInHours / 24;

  return `${Math.round(differenceInDays)}:${Math.round(
    differenceInHours
  )}:${Math.round(differenceInMinutes)}`;
};

export const getTimeDifferenceToDisplay = (
  dateDifferenceString: string
): string => {
  const [days, hours, minutes] = dateDifferenceString.split(":").map(Number);

  if (days !== 0) {
    return `${days}Days`;
  }
  if (hours !== 0) {
    return `${hours}Hrs`;
  }
  if (minutes !== 0) {
    return `${minutes}Min`;
  }

  return "Now";
};

export const getTodayDay = (): number => {
  return new Date().getDate();
};

export const getTodayMonth = (): number => {
  return new Date().getMonth() + 1;
};

export const getTodayYear = (): number => {
  return new Date().getFullYear();
};

export const isDateOlder = (dateToCheck: Date): boolean => {
  const dateToCheckObj = new Date(dateToCheck);
  const currentDate = new Date();

  dateToCheckObj.setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);

  return dateToCheckObj < currentDate;
};

export const getDayName = (
  date: Date = new Date(),
  locale: string = "en-En"
): string => {
  return date.toLocaleDateString(locale, { weekday: "long" });
};

declare global {
  interface Date {
    addDays(days: number): Date;
  }
}

Date.prototype.addDays = function (days: number): Date {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

export function getDates(startDate: Date, stopDate: Date): Date[] {
  const dateArray: Date[] = [];
  let currentDate = startDate;
  while (currentDate <= stopDate) {
    dateArray.push(new Date(currentDate));
    currentDate = currentDate.addDays(1);
  }
  return dateArray;
}

export function convertTimestampToDate(task: any): any {
  return {
    createDate: task.createDate.toDate(),
    date: task.date.toDate(),
    taskDoneDate: task.taskDoneDate ? task.taskDoneDate.toDate() : null,
    description: task.description,
    list: task.list,
    id: task.id,
    taskName: task.taskName,
  };
}
