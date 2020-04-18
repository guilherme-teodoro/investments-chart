import React from "react";
import { render, act } from "@testing-library/react";
import { waitFor, getByTestId } from "@testing-library/dom";
import App from "./App";

test("render App", async () => {
  await act(async () => {
    const mockData = [
      [1565308800000, 24960],
      [1565568000000, 24960],
      [1565654400000, 24963.28],
      [1565740800000, 24966.55],
      [1565827200000, 24969.83],
      [1565913600000, 24973.11],
      [1566172800000, 24976.39],
      [1566259200000, 24979.67]
    ];

    fetch.mockResponseOnce(JSON.stringify(mockData));
    const { getByText, getByTestId } = render(<App />);
    expect(getByText(/Carregando/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(getByText(/Você está vendo o período/i)).toBeInTheDocument();
      expect(getByTestId("chart")).toBeInTheDocument();
    });
  });
});
