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

const getAllDates = (s, e) => {
  const date = [moment(s), moment(e)].sort((a, b) => a.unix() - b.unix());

  return Array.from({ length: Math.abs(date[0].diff(date[1], "day")) + 1 }, (_, index) => date[0].clone().add(index, "day"));
};

const getWeekends = (array = [], settings = []) => {
  const weekEnds = [];
  settings.forEach((a) => {
    if (a.typeOfWeekEnd.includes("All")) {
      const day = moment.weekdays().indexOf(a.day);

      weekEnds.push(array.filter((a) => a.day() === day));
    } else {
      a.typeOfWeekEnd.forEach((b) => {
        const day = moment.weekdays().indexOf(a.day);
        const week = getWeekNumber(b);
        weekEnds.push(
          array.filter((c) => {
            return c.day() === day && c.week() - c.clone().startOf("month").week() + 1 === week;
          })
        );
      });
    }
  });
  return weekEnds.flat();
};

const getHolidayBetweenDate = (s, e, holidays = []) => {
  const date = [moment(s), moment(e)].sort((a, b) => a.unix() - b.unix());
  return holidays
    .map((a) => moment(a?.date))
    .filter((a) => a.isSame(date[0], "day") || a.isBetween(date[0], date[1]) || a.isSame(date[1], "day"));
};

const getWorkingDayBetweenDate = (s, e, working_days = []) => {
  const date = [moment(s), moment(e)].sort((a, b) => a.unix() - b.unix());
  return working_days
    .map((a) => moment(a?.date))
    .filter((a) => a.isSame(date[0], "day") || a.isBetween(date[0], date[1]) || a.isSame(date[1], "day"));
};

const getTotalTime = (array = []) => {
  const dates = array
    .map((a) => moment(a))
    .sort((a, b) => a.unix() - b.unix())
    .slice(0, array.length - (array.length % 2));
  return Array.from({ length: Math.abs(dates.length / 2) }, (_, index) => dates[index * 2 + 1].diff(dates[index * 2])).reduce(
    (acc, cv) => acc + cv,
    0
  );
};

const getDayCount = (punches, date, total_time) => {
  return {
    absent: total_time < 255,
    present: total_time > 449,
    isHalf: total_time > 254 && total_time < 450,
    isLate:
      punches.length > 0
        ? punches[0].isSameOrBefore(date.clone().set({ hour: 13, minute: 0, second: 0, millisecond: 0 }))
          ? !punches[0].isSameOrBefore(date.clone().set({ hour: 9, minute: 45, second: 1, millisecond: 0 }))
          : !!punches[0].isSameOrBefore(date.clone().set({ hour: 2, minute: 15, second: 1, millisecond: 0 }))
        : false,
    isBetween: total_time > 449 && total_time < 510
  };
};

const getFinalCount = ({ absent, present, isLate, isHalf, isBetween, arr }) => {
  if (absent) {
    return 0;
  }
  if (present && !isBetween && !isLate) {
    return 1;
  }
  if (isHalf) {
    return 0.5;
  }
  if (isLate) {
    return arr && arr.filter((a) => a.cond.isLate).length >= 3 ? 0.5 : 1;
  }
  if (isBetween) {
    return arr && arr.filter((a) => a.cond.isBetween).length >= 3 ? 0.5 : 1;
  }
  return 0;
};

exports.getHolidayBetweenDate = (s, e, holidays = []) => {
  const date = [moment(s), moment(e)].sort((a, b) => a.unix() - b.unix());
  return holidays
    .map((a) => moment(a?.date))
    .filter((a) => a.isSame(date[0], "day") || a.isBetween(date[0], date[1]) || a.isSame(date[1], "day"));
};

exports.getLeaves = ({ from, to, from_half, to_half, weekEnds, holidays, is_sandwich, working_days }) => {
  const allDates = getAllDates(from, to);
  const allWeekEnds = getWeekends(allDates, weekEnds);
  const allHolidays = getHolidayBetweenDate(from, to, holidays);
  const allWorkingDays = getWorkingDayBetweenDate(from, to, working_days);
  const data = allDates
    .map((a, i, arr) => ({
      date: a,
      isHoliday: Boolean(allWeekEnds.find((b) => b.isSame(a, "day"))),
      isWeekEnd: Boolean(allHolidays.find((b) => b.isSame(a, "day"))),
      isWorkingDay: Boolean(allWorkingDays.find((b) => b.isSame(a, "day"))),
      isHalf: (i === 0 && from_half) || (i === arr.length - 1 && to_half)
    }))
    .map((a, i, arr) => ({
      ...a,
      count:
        (is_sandwich &&
          arr
            .slice(0, i)
            .map((a) => a.isHoliday || a.isWeekEnd)
            .includes(false) &&
          arr
            .slice(i + 1, arr.length)
            .map((a) => a.isHoliday || a.isWeekEnd)
            .includes(false)) ||
        !(a.isHoliday || a.isWeekEnd) ||
        a.isWorkingDay
          ? a.isHalf
            ? 0.5
            : 1
          : 0
    }));
  return { totalDays: data.reduce((acc, cv) => acc + cv.count, 0), data };
};

exports.getDateWiseObject = ({ startDate, endDate, settings, leaves, holidays, punches, misPunch = [], working_days }) => {
  const getAllDate = getAllDates(startDate, endDate);
  const weekEnd = getWeekends(getAllDate, settings.weekends);
  const holiday = getHolidayBetweenDate(startDate, endDate, holidays);
  const allWorkingDays = getWorkingDayBetweenDate(startDate, endDate, working_days);
  const allLeaves = leaves
    .map(
      (a) =>
        this.getLeaves({
          from: a.from,
          to: a.to,
          from_half: a.from_half,
          to_half: a.to_half,
          holidays,
          weekEnds: settings.weekends,
          is_sandwich: settings.typeOfLeaves.find((b) => b._id?.toString() === a?.leave_type?.toString())?.is_sandwich,
          working_days
        }).data
    )
    .flat();

  return getAllDate
    .map((cv) => {
      const punch = [...punches.filter((a) => cv.isSame(a, "day")), ...misPunch.filter((a) => cv.isSame(a, "day"))]
        .map((a) => moment(a))
        .sort((a, b) => a.unix() - b.unix());
      return {
        date: cv,
        isHoliday: holiday.some((a) => a.isSame(cv, "day")),
        isWeekEnd: weekEnd.some((a) => a.isSame(cv, "day")),
        isWorkingDay: allWorkingDays.some((a) => a.isSame(cv, "day")),
        leave: allLeaves.find((a) => a.date.isSame(cv, "day")),
        punches: punch,
        cond: getDayCount(punch, cv, getTotalTime(punch) / 60000),
        totalHours: getTotalTime(punch)
      };
    })
    .map((a, i, arr) => ({
      ...a,
      count: getFinalCount({ ...a.cond, ...((a.cond.isBetween || a.cond.isLate) && { arr: arr.slice(0, i) }) })
    }));
};

exports.totalWorkingDays = ({ startDate, endDate, settings, holidays, working_days }) => {
  const getAllDate = getAllDates(startDate, endDate);
  const weekEnd = getWeekends(getAllDate, settings);
  const holiday = getHolidayBetweenDate(startDate, endDate, holidays);
  const workingDays = getWorkingDayBetweenDate(startDate, endDate, working_days);
  return getAllDate.filter((cv) =>
    workingDays.some((a) => cv.isSame(a, "day"))
      ? true
      : !(holiday.some((a) => cv.isSame(a, "day")) || weekEnd.some((a) => cv.isSame(a, "day")))
  ).length;
};
