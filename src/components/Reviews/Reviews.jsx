import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import getReviews from '../../apiServices/reviews';

export default function Reviews() {
  const [movies, setMovies] = useState([]); // Початковий стан — порожній масив
  const [error, setError] = useState(null); // Для збереження помилок
  const [loading, setLoading] = useState(null); // Для збереження помилок
  const { movieId } = useParams();

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const data = await getReviews(movieId); // Викликаємо функцію для отримання трендових фільмів
        setMovies(data); // Зберігаємо результати у стан
        setLoading(false);
      } catch (error) {
        setError(error.message); // Зберігаємо повідомлення про помилку
        setLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  return (
    <div>
      <h2>Reviews</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        movies.length > 0 && (
          <ul>
            {movies.map(movie => (
              <li key={movie.id}>
                <p>{movie.name}</p>
              </li>
            ))}
          </ul>
        )
      )}
      {movies.length === 0 && !loading && <p>no reviews yet</p>}
    </div>
  );
}
