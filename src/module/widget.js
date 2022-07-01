export const typeDates = [
  {
    title: "Today",
    fun: () => {
      return [10, 10];
    },
  },
  {
    title: "Yesterday",
    fun: () => {
      return [9, 9];
    },
  },
  {
    title: "This Week",
    fun: () => {
      return [4, 10];
    },
  },
  {
    title: "Last Week",
    fun: () => {
      return [1, 1];
    },
  },
  {
    title: "This Month",
    fun: () => {
      return [1, 1];
    },
  },
  {
    title: "Last Month",
    fun: () => {
      return [1, 1];
    },
  },
  {
    title: "This Quarter",
    fun: () => {
      return [1, 1];
    },
  },
  {
    title: "Last Quarter",
    fun: () => {
      return [1, 1];
    },
  },
  {
    title: "This Year",
    fun: () => {
      return [1, 1];
    },
  },
  {
    title: "Last Year",
    fun: () => {
      return [1, 1];
    },
  },
];

export const shortDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const fullMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function makeCalenderDigits(y, m) {
  const firstday = new Date(y, m, 1).getDay();
  const lastday = new Date(y, m, 0).getDate();
  let flag = null;
  const days = [];
  for (let i = 0; i < 42; i++) {
    if (flag !== null) flag++;
    else if (i === firstday) flag = 1;
    days.push(flag);
    if (flag === lastday) flag = null;
  }
  return days;
}
