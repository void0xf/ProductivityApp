export const getNameOfMonth = (month) => {
  const datesMap = new Map()
  datesMap.set(1, 'January')
  datesMap.set(12, 'December')

  return datesMap.get(month);

}

export const getTodayDate = () => {
  const date = new Date();
  
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();


  const currentDate = `${year}-${month}-${day}`;

  return currentDate
}

export const compareDate = (date, date2) => {
  return date.getDate() == date2.getDate() &&
          date.getMonth() == date2.getMonth() &&
          date.getFullYear() == date2.getFullYear()
}

export const getTodayDay = () => {
  const date = new Date();
  
  const day = date.getDate();

  return day
}

export const getTodayMonth = () => {
  const date = new Date();
  
  const month = date.getMonth() + 1;

  return month
}

export const getTodayYear = () => {
  const date = new Date();
  
  const year = date.getFullYear();

  return year
}

export const isDateOlder = (dateToCheck) => {
  // Create a Date object for the date you want to check
  const dateToCheckObj = new Date(dateToCheck);

  // Get the current date
  const currentDate = new Date();

  // Set the time for both dates to midnight (00:00:00)
  dateToCheckObj.setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);

  // Compare the two dates
  return dateToCheckObj < currentDate;
}

export const getDayName = (date = new Date(), locale = 'en-En') => {
  return date.toLocaleDateString(locale, {weekday: 'long'})
}

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

export function getDates(startDate, stopDate) {
  var dateArray = new Array();
  var currentDate = startDate;
  while (currentDate <= stopDate) {
      dateArray.push(new Date (currentDate));
      currentDate = currentDate.addDays(1);
  }
  return dateArray;
}