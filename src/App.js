import React from "react";
import "./App.css";
import { InvestmentChart } from "./components/Chart";
import { usePersistentFetch } from "./hook";

export default function App() {
  const [json, loading] = usePersistentFetch(
    "https://gist.githubusercontent.com/AgtLucas/a67c345e15c2eb3d4668c9b7e330ac44/raw/1de2450cbe69fde065bca9e498aaaaafcca61257/mock-data.js"
  );

  if (loading) {
    return <div>Carregando</div>;
  }

  const data = json.map(([date, amount]) => ({ date, amount }));

  return (
    <div>
      <InvestmentChart data={data} />
    </div>
  );
}
