import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import getMoviesByKeyword from '../../apiServices/moviesSearch';
import SearchBar from '../SearchBar/SearchBar';
import css from './MovieList.module.css';

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('name') || '';

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMoviesByKeyword({ query });
        setMovies(data);
      } catch (error) {
        setError('Failed to load movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSubmit = newQuery => {
    setSearchParams({ name: newQuery });
    setMovies([]);
  };

  return (
    <div className={css.cont}>
      <SearchBar onSubmit={handleSubmit} />

      {movies.length === 0 && !loading && !error && (
        <div className="start">Let’s begin search 🔎</div>
      )}

      {movies.length > 0 && (
        <ul className={css.list}>
          {movies.map(movie => (
            <li key={movie.id} className={css.elem}>
              <Link to={`/movies/${movie.id}`} state={{ from: location }}>
                {movie.original_title}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {error && <h2 className="error">{error}</h2>}
    </div>
  );
}
