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
      <div className="label-icon-wrapper">
      {icon && <FontAwesomeIcon icon={icon} className="icon-default" />}
      {label && <label>{label}</label>}
      </div>
      <div className="input-wrapper">
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
