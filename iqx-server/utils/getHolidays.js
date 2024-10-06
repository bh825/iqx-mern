const moment = require("moment");

const getWeekNumber = (s) => {
  switch (s) {
    case "first":
      return 1;
    case "second":
      return 2;
    case "third":
      return 3;
    case "fourth":
      return 4;
    case "fifth":
      return 1;
    default:
      break;
  }
};

module.exports = (s, e, holidays, settings) => {
  const date = [moment(s), moment(e)].sort((a, b) => a.unix() - b.unix());
  const allDates = Array.from({ length: Math.abs(date[0].diff(date[1], "day")) + 1 }, (_, index) => date[0].clone().add(index, "day"));
  const totalHolidays = [];

  totalHolidays.push(
    holidays
      .map((a) => moment(a?.date))
      .filter((a) => a.isSame(date[0], "day") || a.isBetween(date[0], date[1]) || a.isSame(date[1], "day"))
  );

  settings.weekends.forEach((a) => {
    if (a.typeOfWeekEnd.includes("All")) {
      const day = moment.weekdays().indexOf(a.day);

      totalHolidays.push(allDates.filter((a) => a.day() === day));
    } else {
      a.typeOfWeekEnd.forEach((b) => {
        const day = moment.weekdays().indexOf(a.day);
        const week = getWeekNumber(b);
        totalHolidays.push(
          allDates.filter((c) => {
            return c.day() === day && c.week() - c.clone().startOf("month").week() + 1 === week;
          })
        );
      });
    }
  });
  return totalHolidays.flat(Infinity);
};
