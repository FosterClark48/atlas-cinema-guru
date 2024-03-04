import React from 'react';
import './general.css';

function SearchBar({ title, setTitle }) {
  // Handle input changes, calls setTitle w/ new value
  const handleInput = (event) => {
    setTitle(event.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        value={title}
        onChange={handleInput}
        placeholder="Search..."
      />
    </div>
  );
}

export default SearchBar;
