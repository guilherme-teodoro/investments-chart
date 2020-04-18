import { isWithinInterval, sub } from "date-fns";

export function adaptData([date, amount]) {
  return { date: date, amount };
}

export function filterByType(lastEntry, type) {
  return function ({ date }) {
    const now = new Date(lastEntry);

    switch (type) {
      case "all":
        return true;
      case "lastMonth":
        return isWithinInterval(date, {
          start: sub(now, { months: 1 }),
          end: now,
        });
      case "threeMonths":
        return isWithinInterval(date, {
          start: sub(now, { months: 3 }),
          end: now,
        });
      case "lastYear":
        return isWithinInterval(date, {
          start: sub(now, { years: 1 }),
          end: now,
        });
      case "twoYears":
        return isWithinInterval(date, {
          start: sub(now, { years: 2 }),
          end: now,
        });
      default:
        return true;
    }
  };
}
