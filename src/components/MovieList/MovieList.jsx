import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';
import getMoviesByKeyword from '../../apiServices/moviesSearch';
import getTrendingMovies from '../../apiServices/movies';

export default function MovieList({ query }) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = query
          ? await getMoviesByKeyword({ query })
          : await getTrendingMovies();
        setMovies(data);
      } catch {
        setError('Failed to load movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (movies.length === 0) return <p>No movies found.</p>;

  return (
    <ul className={css.list}>
      {movies.map(movie => (
        <li key={movie.id} className={css.elem}>
          <Link to={`/movies/${movie.id}`} state={{ from: location }}>
            {movie.original_title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
