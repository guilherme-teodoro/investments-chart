import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";
import React from "react";
import  { formatCurrency, formatDate } from '../util';

function CustomTooltip({ date, amount }) {
  return (
    <div className="chart__tooltip">
      <div className="chart__tooltip-date">{formatDate(date)}</div>
      <div className="chart__tooltip-amount">{formatCurrency(amount)}</div>
    </div>
  );
}

export function InvestmentChart({ data }) {
  return (
    <AreaChart width={750} height={445} data={data}>
      <CartesianGrid vertical={false} horizontal={true} stroke="#e2e8f0" />
      <XAxis
        tickLine={false}
        ticks={[data[0].date, data[data.length - 1].date]}
        interval={0}
        tick={{ fill: "#8295A3" }}
        tickFormatter={formatDate}
        dataKey="date"
        stroke="#a0aec0"
      ></XAxis>
      <YAxis
        dateKey="amount"
        axisLine={false}
        tickLine={false}
        tick={{ fill: "#C5C5C5", strokeWidth: 1, fontWeight: "bold" }}
        tickFormatter={(e) => `${e / 1000}k`}
        orientation="right"
      />
      <Tooltip
        content={(e) => {
          if (e.active) {
            const { date, amount } = e.payload[0].payload;
            return <CustomTooltip date={date} amount={amount} />;
          }

          return null;
        }}
      />
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="1" y2="0">
          <stop offset="5%" stopColor="#56A3D5" stopOpacity={1} />
          <stop offset="95%" stopColor="#42B8EC" stopOpacity={0.5} />
        </linearGradient>
      </defs>
      <Area
        type="monotone"
        dataKey="amount"
        stroke="#159BE3"
        strokeWidth="4"
        fillOpacity="1"
        fill="url(#colorUv)"
      />
    </AreaChart>
  );
}
