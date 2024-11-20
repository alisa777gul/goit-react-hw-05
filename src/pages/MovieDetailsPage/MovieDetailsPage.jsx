import { Link, Outlet } from 'react-router-dom';
import MovieDetails from '../../components/MovieDetails/MovieDetails';
import css from './MovieDetailsPage.module.css';

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
      <Outlet />
    </>
  );
}
