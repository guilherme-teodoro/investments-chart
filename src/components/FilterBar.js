import React from "react";
import "./FilterBar.css";

export default function FilterBar({ value, options, onChange }) {
  return (
    <div className="FilterBar">
      Você está vendo o período desde
      <select
        className="FilterBar__select"
        data-testid="filterbar-select"
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
