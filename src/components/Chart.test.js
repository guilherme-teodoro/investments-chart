import React from "react";
import { render } from "@testing-library/react";
import InvestmentChart, { CustomTooltip } from "./Chart";

test("Chart render component", () => {
  const data = [
    { amount: 24960, date: 1565308800000 },
    { amount: 24960, date: 1565568000000 },
    { amount: 24963.28, date: 1565654400000 },
    { amount: 24966.55, date: 1565740800000 },
    { amount: 24969.83, date: 1565827200000 },
    { amount: 24973.11, date: 1565913600000 },
    { amount: 24976.39, date: 1566172800000 },
    { amount: 24979.67, date: 1566259200000 },
  ];
  const { getByTestId } = render(
    <InvestmentChart data={data} />
  );

  expect(getByTestId("chart")).toBeInTheDocument;
});

test("Tooltip component", () => {
  const { getByText } = render(
    <CustomTooltip amount={24960} date={1565308800000 } />
  );

  expect(getByText(/08 ago 2019/i)).toBeInTheDocument;
  expect(getByText(/R\$24,960.00/i)).toBeInTheDocument;
});