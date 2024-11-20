import { useEffect, useState } from 'react';
import getTrendingMovies from '../../apiServices/movies';
import { Link } from 'react-router-dom';
import css from './Home.module.css';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const data = await getTrendingMovies();
        setMovies(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div className={css.cont}>
      <h2 className={css.title}>Trending Today</h2>
      {error && <p className="error">Error: {error}. Reload page.</p>}
      {movies.length > 0 ? (
        <ul className={css.list}>
          {movies.map(movie => (
            <li key={movie.id} className={css.elem}>
              <Link to={`/movies/${movie.id}`}>{movie.original_title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No trending movies found.</p>
      )}
    </div>
  );
}
