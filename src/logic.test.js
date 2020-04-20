import { adaptData, filterByType } from "./logic";

test("adaptData", () => {
  const mockData = [
    [1565308800000, 24960],
    [1565568000000, 24960],
    [1565654400000, 24963.28],
    [1565740800000, 24966.55],
    [1565827200000, 24969.83],
    [1565913600000, 24973.11],
    [1566172800000, 24976.39],
    [1566259200000, 24979.67],
  ];

  expect(mockData.map(adaptData)).toEqual([
    { amount: 24960, date: 1565308800000 },
    { amount: 24960, date: 1565568000000 },
    { amount: 24963.28, date: 1565654400000 },
    { amount: 24966.55, date: 1565740800000 },
    { amount: 24969.83, date: 1565827200000 },
    { amount: 24973.11, date: 1565913600000 },
    { amount: 24976.39, date: 1566172800000 },
    { amount: 24979.67, date: 1566259200000 },
  ]);
});

describe("fitlerByType", () => {
  const now = 1587243434092;

  const mockData = [
    { amount: 23450, date: 1587168000000 }, // 2020-04-17
    { amount: 23450, date: 1586908800000 }, // 2020-04-15
    { amount: 23450, date: 1579046400000 }, // 2020-01-15
    { amount: 23450, date: 1560556800000 }, // 2019-06-15
    { amount: 23450, date: 1515974400000 }, // 2018-01-14
  ];

  test("filter all", () => {
    expect(mockData.filter(filterByType(now, "ALL"))).toEqual(mockData);
  });

  test("filter last month", () => {
    expect(mockData.filter(filterByType(now, "LAST_MONTH"))).toEqual([
      { amount: 23450, date: 1587168000000 },
      { amount: 23450, date: 1586908800000 },
    ]);
  });

  test("filter three months", () => {
    expect(mockData.filter(filterByType(now, "THREE_MONTHS"))).toEqual([
      { amount: 23450, date: 1587168000000 },
      { amount: 23450, date: 1586908800000 },
    ]);
  });

  test("filter last year", () => {
    expect(mockData.filter(filterByType(now, "LAST_YEAR"))).toEqual([
      { amount: 23450, date: 1587168000000 },
      { amount: 23450, date: 1586908800000 },
      { amount: 23450, date: 1579046400000 },
      { amount: 23450, date: 1560556800000 },
    ]);
  });

  test("filter two years", () => {
    expect(mockData.filter(filterByType(now, "TWO_YEARS"))).toEqual([
      { amount: 23450, date: 1587168000000 },
      { amount: 23450, date: 1586908800000 },
      { amount: 23450, date: 1579046400000 },
      { amount: 23450, date: 1560556800000 },
    ]);
  });
});
