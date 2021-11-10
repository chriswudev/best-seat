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

const getSeats = () => {
  return fetch(getUrl('/seat/index'));
};

const getBestSeats = (count) => {
  return fetch(getUrl(`/seat/best/${count}`));
};

const addSeats = (values) => {
  return fetch(getUrl('/seat/'), {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  });
};

const resetSeats = () => {
  return fetch(getUrl('/seat/'), {
    method: 'delete',
  });
};

export {
  getMovies,
  addMovie,
  updateMovie,
  deleteMovie,
  getSeats,
  getBestSeats,
  addSeats,
  resetSeats,
};
