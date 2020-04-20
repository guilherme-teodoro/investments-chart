import React from "react";
import PropTypes from "prop-types";
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

FilterBar.propTypes = {
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.exact({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })),
  onChange: PropTypes.func.isRequired,
};
