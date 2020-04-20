import React from "react";
import "./App.css";
import InvestmentChart from "./components/Chart";
import FilterBar from "./components/FilterBar";
import Loading from "./components/Loading";
import EmptyState from "./components/EmptyState";
import { useFetch, useLocalStorage } from "./hook";
import { filterByType, adaptData } from "./logic";

export default function App() {
  const [json, isLoading] = useFetch(
    "https://gist.githubusercontent.com/AgtLucas/a67c345e15c2eb3d4668c9b7e330ac44/raw/1de2450cbe69fde065bca9e498aaaaafcca61257/mock-data.js"
  );
  const [filter, setFilter] = useLocalStorage("filter", "ALL");

  if (isLoading) {
    return <Loading />;
  }

  const periods = [
    { label: "o início", value: "ALL" },
    { label: "do último mês", value: "LAST_MONTH" },
    { label: "dos últimos 3 meses", value: "THREE_MONTHS" },
    { label: "último 1 ano", value: "LAST_YEAR" },
    { label: "últimos 2 anos", value: "TWO_YEARS" },
  ];

  const LAST_ENTRY_TIMESTAMP = 1578009600000; 
  // Visto que a api é estatíca resolvi deixar esse valor hardcoded para representar
  /// a ultima entrada de valores, isso é necessário para a filtragem. 
  // Acredito que se fosse uma api real que esse valor 
  // devesse ser o dia atual (now). Ou a api poderia retornar a ultima
  // atualização com dos rendimentos.

  const data = json
    .map(adaptData)
    .filter(filterByType(LAST_ENTRY_TIMESTAMP, filter))
    .sort((a, b) => a.date - b.date);

  return (
    <main className="App">
      <h1 className="App__header">Investment Chart</h1>
      <FilterBar value={filter} options={periods} onChange={setFilter} />
      { data.length === 0 ? <EmptyState /> : <InvestmentChart data={data} /> }
    </main>
  );
}
