import './App.css';
import { Routes, Route } from 'react-router-dom';

import Header from './Header/Header';

import MovieCast from './MovieCast/MovieCast';
import Reviews from './Reviews/Reviews';
import HomePage from '../pages/HomePage/HomePage';
import MoviesPage from '../pages/MoviesPage/MoviesPage';
import MovieDetailsPage from '../pages/MovieDetailsPage/MovieDetailsPage';
import NotFound from '../pages/NotFoundPage/NotFoundPage';

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
