import React from 'react';

const MoviesContext = React.createContext({
  movies: [],
  addMovie: () => {}
});

export default MoviesContext;