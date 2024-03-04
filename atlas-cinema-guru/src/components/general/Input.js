import React from 'react';
import './general.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Input({ label, type, className, value, setValue, icon, inputAttributes }) {
  // Handle input changes, call setValue w/ new value
  const handleInput = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className={`input-group ${className || ''}`}>
      {label && <label>{label}</label>}
      <div className="input-wrapper">
        {icon && <FontAwesomeIcon icon={icon} />}
        <input
          type={type}
          value={value}
          onChange={handleInput}
          {...inputAttributes}
        />
      </div>
    </div>
  );
}

export default Input;
