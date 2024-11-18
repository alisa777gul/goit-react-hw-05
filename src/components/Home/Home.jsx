import { useEffect, useState } from 'react';
import getMovies, { getMoviesByMovieID } from '../../apiServices/movies';

export default function Home() {
  const [movies, setMovies] = useState(null);
  const [query, setQuery] = useState('Avengers'); // Початковий запит

  useEffect(() => {
    const fetchMovies = async movieID => {
      try {
        const data = await getMoviesByMovieID(movieID); // Викликаємо функцію з `query`
        setMovies(data.movie); // Зберігаємо результати у стан
      } catch (error) {
        console.error('Failed to fetch movies:', error.message);
      }
    };

    fetchMovies();
  }, [movies]); // Викликаємо ефект при зміні `query`

  return (
    <div>
      <h2>Movies</h2>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}
