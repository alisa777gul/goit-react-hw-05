import axios from 'axios';

const getCast = async movieId => {
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/movie/${movieId}/credits`,
    params: { language: 'en-US' },
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZjQzN2FhY2I5NTZhMzYzNDAxZmE3N2JjM2NhMzcxZCIsIm5iZiI6MTczMTk1ODAxNi4yMDQ1MTg2LCJzdWIiOiI2NzNiOTNjNjcwMzA0ZjI4Yzg1ZmYyMjUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.WLPQ9OT58PknukpdyqoUbtPolQEO4RTzHhVvqcdt0v4',
    },
  };

  try {
    const { data } = await axios(options);
    console.log('API Response:', data);
    return data.cast || []; // Возвращаем список актеров или пустой массив
  } catch (error) {
    console.error('Error fetching cast:', error.message);
    throw error; // Бросаем ошибку для дальнейшей обработки
  }
};

export default getCast;
