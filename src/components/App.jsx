import './App.css';
import { Routes, Route } from 'react-router-dom';

import NotFound from '../pages/NotFoundPage/NotFoundPage';
import Header from './Header/Header';
import MovieDetailsPage from '../pages/MovieDetailsPage/MovieDetailsPage';
import HomePage from '../pages/HomePage';
import MoviesPage from '../pages/MoviesPage';
import MovieCast from './MovieCast/MovieCast';
import Reviews from './Reviews/Reviews';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        {/* Исправленный маршрут для MovieDetailsPage с вложенными маршрутами */}
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
