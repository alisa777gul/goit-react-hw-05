import { useEffect, useState } from 'react';
import css from './MovieCast.module.css';
import { useParams } from 'react-router-dom';
import getCast from '../../apiServices/cast';
import Loader from '../Loader/Loader';

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
        setError(true); // Зберігаємо повідомлення про помилку
        setLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  return (
    <div>
      <h2 className={css.title}>Cast</h2>
      {error ? (
        <p className="error">Error. Reload page.</p>
      ) : (
        movies.length > 0 && (
          <ul className={css.list}>
            {movies.map(movie => (
              <li key={movie.id} className={css.elem}>
                <div className={css.imgCont}>
                  <img
                    className={css.img}
                    src={`https://image.tmdb.org/t/p/w500/${movie.profile_path}`}
                    alt={movie.name}
                    width="100"
                  />
                </div>
                <p className={css.name}>{movie.name}</p>
              </li>
            ))}
          </ul>
        )
      )}
      {loading && <Loader />}
      {!loading && movies.length === 0 && <p>No info about cast</p>}
    </div>
  );
}
