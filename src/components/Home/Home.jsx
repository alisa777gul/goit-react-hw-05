import { useEffect, useState } from 'react';
import getTrendingMovies from '../../apiServices/movies';
import { Link } from 'react-router-dom';

export default function Home() {
  const [movies, setMovies] = useState([]); // Початковий стан — порожній масив
  const [error, setError] = useState(null); // Для збереження помилок

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const data = await getTrendingMovies(); // Викликаємо функцію для отримання трендових фільмів
        setMovies(data); // Зберігаємо результати у стан
      } catch (error) {
        setError(error.message); // Зберігаємо повідомлення про помилку
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div>
      <h2>Trending Today</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : movies.length > 0 ? (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              {/* Коректний синтаксис для шаблонного рядка */}
              <Link to={`/movies/${movie.id}`}>{movie.original_title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
