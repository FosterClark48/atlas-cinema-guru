import React from 'react';
import './general.css';

function SelectInput({ label, options, className, value, setValue }) {
  // Handle select changes, call setValue w/ new value
  const handleSelect = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className={`select-input ${className || ''}`}>
      {label && <label>{label}</label>}
      <select value={value} onChange={handleSelect} className="select-element">
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectInput;
