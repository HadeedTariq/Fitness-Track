import { format, getDay } from "date-fns";

const dayFormatter = (day: number) => {
  let d;
  if (day === 0) {
    d = "Sunday";
  }
  if (day === 1) {
    d = "Monday";
  }
  if (day === 2) {
    d = "Tuesday";
  }
  if (day === 3) {
    d = "Wednesday";
  }
  if (day === 4) {
    d = "Thursday";
  }
  if (day === 5) {
    d = "Friday";
  }
  if (day === 6) {
    d = "Saturday";
  }
  console.log(d);
  return d;
};

const getDateDay = (date: string) => {
  const day = getDay(date);
  const realDate = format(date, "dd-MM-yyyy");
  const realDay = dayFormatter(day);
  return [realDay, realDate];
};
export { dayFormatter, getDateDay };
