import React from "react";
import "./App.css";
import InvestmentChart from "./components/Chart";
import FilterBar from "./components/FilterBar";
import Loading from "./components/Loading";
import { useFetch, useLocalStorage } from "./hook";
import { filterByType, adaptData } from "./logic";

export default function App() {
  const [json, loading] = useFetch(
    "https://gist.githubusercontent.com/AgtLucas/a67c345e15c2eb3d4668c9b7e330ac44/raw/1de2450cbe69fde065bca9e498aaaaafcca61257/mock-data.js"
  );
  const [filter, setFilter] = useLocalStorage("filter", "all");

  if (loading) {
    return <Loading />;
  }

  const periods = [
    { label: "o início", value: "all" },
    { label: "do último mês", value: "lastMonth" },
    { label: "dos últimos 3 meses", value: "threeMonths" },
    { label: "último 1 ano", value: "lastYear" },
    { label: "últimos 2 anos", value: "twoYears" },
  ];

  const data = json.map(adaptData).filter(filterByType(1578009600000, filter));

  return (
    <main className="App">
      <FilterBar value={filter} options={periods} onChange={setFilter} />
      <InvestmentChart data={data} />
    </main>
  );
}
