import { Link, Outlet } from 'react-router-dom';
import MovieDetails from '../../components/MovieDetails/MovieDetails';
import css from './MovieDetailsPage.module.css';
import { Suspense } from 'react';
import Loader from '../../components/Loader/Loader';

export default function MovieDetailsPage() {
  return (
    <>
      <MovieDetails />
      <ul className={css.cont}>
        <li className={css.elem}>
          <Link to="cast">Cast</Link>
        </li>
        <li className={css.elem}>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </>
  );
}
