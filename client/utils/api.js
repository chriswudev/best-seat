const baseUrl = 'api';

const getUrl = (path) => `${baseUrl}${path}`;

const getMovies = () => {
  return fetch(getUrl('/movies/index'));
};

const addMovie = (values) => {
  return fetch(getUrl('/movies/'), {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  });
};

const updateMovie = (values) => {
  return fetch(getUrl('/movies/'), {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  });
};

const deleteMovie = (id) => {
  return fetch(getUrl(`/movies/${id}`), {
    method: 'delete',
  });
};

export { getMovies, addMovie, updateMovie, deleteMovie };
