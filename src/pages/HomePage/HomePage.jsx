import MovieList from '../../components/MovieList/MovieList';
import css from './HomePage.module.css';

export default function HomePage() {
  return (
    <div className={css.cont}>
      <h2 className={css.title}>Trending Today</h2>
      <MovieList />
    </div>
  );
}
