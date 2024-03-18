import React, { useState, useEffect } from 'react';
import './dashboard.css';
import MovieCard from '../../components/movies/MovieCard';
import Filter from '../../components/movies/Filter';
import Button from '../../components/general/Button';
import axios from 'axios';

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [minYear, setMinYear] = useState(1970);
  const [maxYear, setMaxYear] = useState(2022);
  const [genres, setGenres] = useState([]);
  const [sort, setSort] = useState("");
  const [title, setTitle] = useState("");
  const [page, setPage] = useState(1);
  const accessToken = localStorage.getItem('accessToken');

  const loadMovies = async (page) => {
    try {
      const response = await axios.get('http://localhost:8000/api/titles/advancedsearch', {
        headers: {
          Authorization: `Bearer ${accessToken}` // Use the token in the Authorization header
        },
        params: {
          minYear: minYear,
          maxYear: maxYear,
          genres: genres.join(','), // Assuming API expects comma-separated values
          title: title,
          sort: sort,
          page: page,
        }
      });
      // Append the new movies to the existing ones
      setMovies(prevMovies => [...prevMovies, ...response.data.titles]);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  // useEffect hook to call loadMovies on component mount and on state changes
  useEffect(() => {
    loadMovies(page);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minYear, maxYear, genres, sort, title, page]); // Add all the states that should trigger a reload

  return (
    <div className="home-page">
      <Filter
        minYear={minYear} setMinYear={setMinYear}
        maxYear={maxYear} setMaxYear={setMaxYear}
        genres={genres} setGenres={setGenres}
        sort={sort} setSort={setSort}
        title={title} setTitle={setTitle}
      />
      <ul className="movie-list">
        {movies.map(movie => (
          <MovieCard key={movie.imdbId} movie={movie} />
        ))}
      </ul>
      <Button label="Load More.." onClick={() => setPage(prevPage => prevPage + 1)} />
    </div>
  );
}

export default HomePage;
