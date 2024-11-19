import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import getCast from '../../apiServices/cast';

export default function MovieCast() {
  const [movies, setMovies] = useState([]); // Початковий стан — порожній масив
  const [error, setError] = useState(null); // Для збереження помилок
  const [loading, setLoading] = useState(null); // Для збереження помилок
  const { movieId } = useParams();

  useEffect(() => {
    const fetchCast = async () => {
      setLoading(true);
      try {
        const data = await getCast(movieId); // Викликаємо функцію для отримання трендових фільмів
        setMovies(data); // Зберігаємо результати у стан
        setLoading(false);
      } catch (error) {
        setError(error.message); // Зберігаємо повідомлення про помилку
        setLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  return (
    <div>
      <h2>Cast</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        movies.length > 0 && (
          <ul>
            {movies.map(movie => (
              <li key={movie.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.profile_path}`}
                  alt={movie.name}
                  width="100"
                />
                <p>{movie.name}</p>
              </li>
            ))}
          </ul>
        )
      )}
      {!loading && movies.length === 0 && <p>No info about cast</p>}
    </div>
  );
}
