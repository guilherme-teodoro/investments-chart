import React, { Component } from "react";
import "./App.css";
import { InvestmentChart } from "./components/Chart";
import mock from "./data";

export default class App extends Component {
  render() {
    const data = mock.map(([date, amount]) => ({ date, amount }));

    return (
      <div>
        <InvestmentChart data={data} />
      </div>
    );
  }
}
