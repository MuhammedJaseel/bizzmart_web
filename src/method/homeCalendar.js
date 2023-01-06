import { postHttp } from "../module/api_int";

const getMonthLastDays = (m, y) => {
  if (m === 1 && y % 4 === 0) return 29;
  if (m === 0) return 31;
  if (m === 1) return 28;
  if (m === 2) return 31;
  if (m === 3) return 30;
  if (m === 4) return 31;
  if (m === 5) return 30;
  if (m === 6) return 31;
  if (m === 7) return 31;
  if (m === 8) return 30;
  if (m === 9) return 31;
  if (m === 10) return 30;
  if (m === 11) return 31;
};

export const getWeekDay = (v) => {
  if (v === 0) return "Sunday";
  if (v === 1) return "Monday";
  if (v === 2) return "Tuesday";
  if (v === 3) return "Wednesday";
  if (v === 4) return "Thursday";
  if (v === 5) return "Friday";
  if (v === 6) return "Saterday";
};
export const getMonth = (m) => {
  if (m === 0) return "January";
  if (m === 1) return "February";
  if (m === 2) return "March";
  if (m === 3) return "April";
  if (m === 4) return "May";
  if (m === 5) return "June";
  if (m === 6) return "July";
  if (m === 7) return "Augest";
  if (m === 8) return "September";
  if (m === 9) return "October";
  if (m === 10) return "November";
  if (m === 11) return "December";
};

const make2Digit = (v) => {
  if (v < 10) return "0" + v;
  else return v;
};

const setCalender = (list, state, setState) => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const lastDay = getMonthLastDays(month, year);
  const weekDay = date.getDay();

  var calendar = [];

  for (let i = 0; i < weekDay + 2; i++) calendar.push({});

  for (let i = 1; i <= 42; i++) {
    const item = {
      date: `${make2Digit(i)}-${make2Digit(month + 1)}-${year}`,
      events: {},
      day: i,
    };

    for (let j = 0; j < list.length; j++) {
      if (list[j].day === `${year}-${make2Digit(month + 1)}-${make2Digit(i)}`)
        item.events = list[j];
    }
    calendar.push(item);
    if (i === lastDay) break;
  }
  setState({ calender: calendar });
};

export const getAllCalenderData = async (state, setState) => {
  setState({ loading: true });
  await postHttp("calendar/getCalendar", {})
    .then((res) => setCalender(res.data, state, setState))
    .catch(() => {});
};

export const getAllAddedvalue = (lsit, name) => {
  var value = 0;
  for (let i = 0; i < lsit.length; i++) value += Number(lsit[i][name]);
  return value;
};
