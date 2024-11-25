import { useSearchParams } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList';
import SearchBar from '../../components/SearchBar/SearchBar';
import css from './MoviesPage.module.css';

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('name') || '';

  const handleSearch = newQuery => {
    setSearchParams({ name: newQuery });
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {!query && <p className={css.text}> Let’s begin search 🔎</p>}
      {query && <MovieList query={query} />}
    </>
  );
}
