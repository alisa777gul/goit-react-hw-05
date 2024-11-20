/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import css from './MovieCast.module.css';
import { useParams } from 'react-router-dom';
import getCast from '../../apiServices/cast';

export default function MovieCast() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const data = await getCast(movieId);
        setMovies(data);
      } catch (error) {
        setError(true);
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
    </div>
  );
}
