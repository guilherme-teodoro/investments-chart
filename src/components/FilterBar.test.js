import React from "react";
import { render, fireEvent } from "@testing-library/react";
import FilterBar from "./FilterBar";

test("FilterBar component", () => {
  const cb = jest.fn();
  const { getByText, getByTestId } = render(
    <FilterBar
      value="a"
      options={[
        { value: "a", label: "A" },
        { value: "b", label: "B" },
        { value: "c", label: "C" },
      ]}
      onChange={cb}
    />
  );

  const selectElement = getByTestId("filterbar-select");

  expect(getByText(/Você está vendo o período desde/i)).toBeInTheDocument;
  expect(selectElement).toBeInTheDocument;
  expect(selectElement.value).toBe("a");
  fireEvent.change(selectElement, { target: { value: "c" } });
  expect(cb.mock.calls.length).toBe(1);
});
