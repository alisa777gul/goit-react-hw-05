import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import css from './Reviews.module.css';
import getReviews from '../../apiServices/reviews';
import Loader from '../Loader/Loader';

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
        setError(true); // Зберігаємо повідомлення про помилку
        setLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  return (
    <div className={css.cont}>
      <h2 className={css.title}>Reviews</h2>
      {error ? (
        <p className="error">Error. Reload page.</p>
      ) : (
        movies.length > 0 && (
          <ul className={css.list}>
            {movies.map(movie => (
              <li className={css.elem} key={movie.id}>
                <p className={css.name}>{movie.name}</p>
              </li>
            ))}
          </ul>
        )
      )}
      {loading && <Loader />}
      {movies.length === 0 && !loading && <p>no reviews yet</p>}
    </div>
  );
}
