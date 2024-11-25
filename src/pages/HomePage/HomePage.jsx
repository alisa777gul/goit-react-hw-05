import { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import getTrendingMovies from '../../apiServices/movies';
import css from './HomePage.module.css';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const data = await getTrendingMovies();
        setMovies(data);
      } catch {
        setError(true);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div className={css.cont}>
      <h2 className={css.title}>Trending Today</h2>
      {error && <p className="error">Failed to load a page. Try again.</p>}
      <MovieList movies={movies} />
    </div>
  );
}
