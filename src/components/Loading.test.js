import React from "react";
import { render } from "@testing-library/react";
import Loading from "./Loading";

test("Loading component", () => {
  const { getByText } = render(<Loading />);

  expect(getByText(/Carregando/i)).toBeInTheDocument;
});
