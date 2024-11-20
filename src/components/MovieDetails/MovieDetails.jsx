import { useParams, Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import css from './MovieDetails.module.css';

export default function MovieDetails() {
  const { movieId } = useParams();
  const location = useLocation();
  const backLink = location.state?.from ?? '/';
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/movie/${movieId}`, {
          params: { language: 'en-US' },
        });
        setMovie(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={css.cont}>
      <Link to={backLink} className={css.back}>
        {' '}
        Go back
      </Link>
      {movie && (
        <div className={css.info}>
          <div className={css.imgCont}>
            <img
              className={css.img}
              src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
              alt={movie.title}
            />
          </div>
          <div className={css.written}>
            <h2 className={css.title}>{movie.title}</h2>
            <p className={css.overview}> {movie.overview}</p>
            <p className={css.date}>Release Date: {movie.release_date}</p>
            <p className={css.rating}>Rating: {movie.vote_average}</p>
          </div>
        </div>
      )}
    </div>
  );
}
