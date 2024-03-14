import React, { useState } from 'react';
import './movies.css';

function Tag({ genre, filter, genres, setGenres }) {
  const [selected, setSelected] = useState(false);

  const handleTag = () => {
    if (selected) {
      // Remove genre from genres
      setGenres(genres.filter(g => g !== genre));
    } else {
      // Add genre to genres
      setGenres([...genres, genre]);
    }
    // Toggle selected state
    setSelected(!selected);
  };

  return (
    <li className={`genre-tag ${selected ? 'selected' : ''}`} onClick={handleTag}>
      {genre}
    </li>
  );
}

export default Tag;
