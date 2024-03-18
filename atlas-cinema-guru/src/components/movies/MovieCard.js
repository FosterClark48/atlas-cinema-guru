import React, { useState, useEffect } from 'react';
import './movies.css';
import axios from 'axios';
import backupImg from '../../assets/backup.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faClock, faClockFour, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';

function MovieCard({ movie }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchLater, setIsWatchLater] = useState(false);
  const accessToken = localStorage.getItem('accessToken');
  const header = {
    headers: { Authorization: `Bearer ${accessToken}`}
};

  useEffect(() => {
    const checkStatus = async () => {
      try {
        // Favorite
        const responseFavorite = await axios.get(`http://localhost:8000/api/titles/favorite/`, header);
        setIsFavorite(responseFavorite.data.some(fav => fav.imdbId === movie.imdbId));

        // Watch Later
        const responseWatchLater = await axios.get(`http://localhost:8000/api/titles/watchlater/`, header);
        setIsWatchLater(responseWatchLater.data.some(wl => wl.imdbId === movie.imdbId));
      } catch (error) {
        console.error('Error fetching movie status:', error);
      }
    };
    checkStatus();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movie.imdbID, accessToken]);

  const handleClick = async (type) => {
    const endpoint = `http://localhost:8000/api/titles/${type}/${movie.imdbID}`;
    try {
      if ((type === 'favorite' && !isFavorite) || (type === 'watchlater' && !isWatchLater)) {
        await axios.post(endpoint, {}, header);
      } else {
        await axios.delete(endpoint, header);
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
      <div className="movie-container">
        <img
          src={movie.imageurls[0] || backupImg }
          alt={movie.title} />
        <div className="movie-actions">
          <FontAwesomeIcon icon={isFavorite ? faStar : faStarHalfAlt} onClick={() => handleClick('favorite')} />
          <FontAwesomeIcon icon={isWatchLater ? faClockFour : faClock} onClick={() => handleClick('watchlater')} />
        </div>
        <h3>{movie.title}</h3>
      </div>
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
