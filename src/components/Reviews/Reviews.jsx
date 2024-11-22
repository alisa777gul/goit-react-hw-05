/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import css from './Reviews.module.css';
import getReviews from '../../apiServices/reviews';

const Reviews = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const data = await getReviews(movieId);
        setMovies(data);
      } catch (error) {
        setError('Failed to load reviews.');
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  return (
    <div className={css.cont}>
      <h2 className={css.title}>Reviews</h2>
      {error ? (
        <p className="error">{error}</p>
      ) : (
        movies.length > 0 && (
          <ul className={css.list}>
            {movies.map(movie => (
              <li key={movie.id} className={css.elem}>
                <p className={css.name}>{movie.name}</p>
              </li>
            ))}
          </ul>
        )
      )}

      {movies.length === 0 && !loading && <p>No reviews yet.</p>}
    </div>
  );
};

export default Reviews;
