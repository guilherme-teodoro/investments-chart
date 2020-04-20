import { isWithinInterval, sub } from "date-fns";

export function adaptData([date, amount]) {
  return { date: date, amount };
}

export function filterByType(lastEntry, type) {
  return function ({ date }) {
    const now = new Date(lastEntry);

    switch (type) {
      case "ALL":
        return true;
      case "LAST_MONTH":
        return isWithinInterval(date, {
          start: sub(now, { months: 1 }),
          end: now,
        });
      case "THREE_MONTHS":
        return isWithinInterval(date, {
          start: sub(now, { months: 3 }),
          end: now,
        });
      case "LAST_YEAR":
        return isWithinInterval(date, {
          start: sub(now, { years: 1 }),
          end: now,
        });
      case "TWO_YEARS":
        return isWithinInterval(date, {
          start: sub(now, { years: 2 }),
          end: now,
        });
      default:
        return true;
    }
  };
}
