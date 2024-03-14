import React, { useState, useEffect } from 'react';
import './movies.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faClock, faClockCheck, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';

function MovieCard({ movie }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchLater, setIsWatchLater] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        // Favorite
        const responseFavorite = await axios.get(`http://localhost:8000/api/titles/favorite/${movie.imdbID}`);
        setIsFavorite(responseFavorite.data.isFavorite);

        // Watch Later
        const responseWatchLater = await axios.get(`http://localhost:8000/api/titles/watchlater/${movie.imdbID}`)
        setIsWatchLater(responseWatchLater.data.isWatchLater);
      } catch (error) {
        console.error('Error fetching movie status:', error);
      }
    };
    checkStatus();
  }, [movie.imdbID]);

  const handleClick = async (type) => {
    const endpoint = `http://localhost:8000/api/titles/${type}/${movie.imdbID}`;
    try {
      if ((type === 'favorite' && !isFavorite) || (type === 'watchlater' && !isWatchLater)) {
        await axios.post(endpoint);
      } else {
        await axios.delete(endpoint);
      }

      // Toggle state based on Type
      if (type === 'favorite') {
        setIsFavorite(!isFavorite);
      } else if (type === 'watchlater') {
        setIsWatchLater(!isWatchLater);
      }
    } catch (error) {
      console.error(`Error updating ${type} status:`, error);
    }
  };

  return (
    <li className="movie-card">
      <div className="movie-actions">
        <FontAwesomeIcon icon={isFavorite ? faStar : faStarHalfAlt} onClick={() => handleClick('favorite')} />
        <FontAwesomeIcon icon={isWatchLater ? faClockCheck : faClock} onClick={() => handleClick('watchlater')} />
      </div>
      <h3>{movie.title}</h3>
      <p>{movie.synopsis}</p>
      <div className="movie-genres">
        {movie.genres.map((genre, index) => (
          <span key={index}>{genre}</span>
        ))}
      </div>
    </li>
  );
}

export default MovieCard;
