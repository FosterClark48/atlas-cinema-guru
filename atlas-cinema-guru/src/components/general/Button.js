import React from 'react';
import './general.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Button({ label, className, onClick, icon }) {
  return (
    <button className={className} onClick={onClick}>
      {icon && <FontAwesomeIcon icon={icon} />} {label}
    </button>
  );
}

export default Button;
