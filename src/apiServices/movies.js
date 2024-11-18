import axios from 'axios';

// Конфігурація Axios
axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.headers[
  'Authorization'
] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZjQzN2FhY2I5NTZhMzYzNDAxZmE3N2JjM2NhMzcxZCIsIm5iZiI6MTczMTk1ODAxMS4xNzgyMzQ2LCJzdWIiOiI2NzNiOTNjNjcwMzA0ZjI4Yzg1ZmYyMjUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.lHf0cZ8CfVi4VFJ_Eei8AAkvdYk4JaNhBXdyMclmTSU`;

/**
 * Отримати список фільмів за запитом.
 * @param {string} query - Запит для пошуку фільмів.
 * @returns {Promise<Array>} - Список фільмів.
 */
export const getMovies = async query => {
  try {
    if (!query) throw new Error('Query parameter is required.');
    console.log('Request Parameters:', { query });

    const { data } = await axios.get('/search/movie', {
      params: { query }, // Передаємо запит у параметрах
    });

    console.log('API Response:', data);
    return data.results; // Повертаємо результати
  } catch (error) {
    console.error('Error fetching movies:', error.message);
    throw error;
  }
};

/**
 * Отримати інформацію про фільм за його ID.
 * @param {string} movieId - Унікальний ідентифікатор фільму.
 * @returns {Promise<Object>} - Інформація про фільм.
 */
export const getMoviesByMovieID = async movieId => {
  try {
    if (!movieId) throw new Error('Movie ID is required.');
    console.log('Request Parameters:', { movieId });

    const { data } = await axios.get(`/movie/${movieId}`); // Запит до URL за ID
    console.log('API Response:', data);
    return data; // Повертаємо інформацію про фільм
  } catch (error) {
    console.error('Error fetching movie by ID:', error.message);
    throw error;
  }
};
