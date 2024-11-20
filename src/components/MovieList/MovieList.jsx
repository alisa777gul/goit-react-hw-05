/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import getMoviesByKeyword from '../../apiServices/moviesSearch';
import SearchBar from '../SearchBar/SearchBar';
import css from './MovieList.module.css';

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const location = useLocation();

  useEffect(() => {
    const savedMovies = localStorage.getItem('movies');
    if (savedMovies) {
      setMovies(JSON.parse(savedMovies));
    }
  }, []);

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      setError(null);
      try {
        const data = await getMoviesByKeyword({ query });
        setMovies(data);
        localStorage.setItem('movies', JSON.stringify(data));
      } catch (error) {
        setError('Failed to load movies. Please try again later.');
      }
    };

    fetchMovies();
  }, [query]);

  const handleSubmit = newQuery => {
    setQuery(newQuery);
    setMovies([]);
    setError(null);
  };

  return (
    <div className={css.cont}>
      <SearchBar onSubmit={handleSubmit} />

      {movies.length === 0 && !query && (
        <div className="start">Let’s begin search 🔎</div>
      )}

      {movies.length > 0 ? (
        <ul className={css.list}>
          {movies.map(movie => (
            <li key={movie.id} className={css.elem}>
              <Link to={`/movies/${movie.id}`} state={{ from: location }}>
                {movie.original_title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        error && <h2 className="error">{error}</h2>
      )}
    </div>
  );
}
