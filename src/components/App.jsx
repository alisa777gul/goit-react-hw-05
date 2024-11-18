import './App.css';
import { Routes, Route } from 'react-router-dom';

import NotFound from '../pages/NotFoundPage';
import Header from './Header/Header';
import HomePage from '../pages/HomePage';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />{' '}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
