import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';

export default function NotFound() {
  return (
    <>
      <Link to="/" className={css.back}>
        Go back
      </Link>
      <p className={css.notFound}>Not found</p>
    </>
  );
}
