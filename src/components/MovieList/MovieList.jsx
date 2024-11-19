import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import getMoviesByKeyword from '../../apiServices/moviesSearch';
import SearchBar from '../SearchBar/SearchBar';

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      try {
        const data = await getMoviesByKeyword({ query });
        setMovies(data);
        localStorage.setItem('movies', JSON.stringify(data));
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
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
    <div>
      <SearchBar onSubmit={handleSubmit} />

      {movies.length === 0 && !loading && !query && (
        <div className="start">Let’s begin search 🔎</div>
      )}
      {loading && <p>Loading...</p>}

      {movies.length > 0 ? (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`} state={{ from: location }}>
                {movie.original_title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        error && <h2>Error: {error}</h2>
      )}
    </div>
  );
}
