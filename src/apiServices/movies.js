import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.headers[
  'Authorization'
] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZjQzN2FhY2I5NTZhMzYzNDAxZmE3N2JjM2NhMzcxZCIsIm5iZiI6MTczMTk1ODAxMS4xNzgyMzQ2LCJzdWIiOiI2NzNiOTNjNjcwMzA0ZjI4Yzg1ZmYyMjUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.lHf0cZ8CfVi4VFJ_Eei8AAkvdYk4JaNhBXdyMclmTSU`;

const getTrendingMovies = async () => {
  try {
    const { data } = await axios.get('/trending/movie/day', {
      params: { language: 'en-US' }, // Додаємо мову як параметр
    });

    console.log('API Response:', data);
    return data.results || []; // Повертаємо результати або порожній масив
  } catch (error) {
    console.error('Error fetching trending movies:', error.message);
    throw error;
  }
};

export default getTrendingMovies;
