import React, { Component } from 'react';
import './App.css';
import Header from './components/UI/Header/Header.js';
import MoviesList from './components/MoviesList/MoviesList.js';
import AddMovie from './components/AddMovie/AddMovie.js';
import MoviesContext from './context/MoviesContext.js';

class App extends Component {
  state = {
    movies: [],
  };

  addMovie = (movie) => {
    this.setState((state) => {
      const updatedMovies = [...state.movies, movie];

      localStorage.setItem('userSavedMovies', JSON.stringify(updatedMovies));
      return {
        movies: updatedMovies
      };
    });
  };

  getMoviesFromLocalStorage = () => {
    const localStorageObject = localStorage.getItem('userSavedMovies');
    const userSavedMovies = JSON.parse(localStorageObject);

    if (userSavedMovies) {
      this.setState({
        movies: userSavedMovies
      });
    }
  };

  componentDidMount() {
    this.getMoviesFromLocalStorage();
  }

  render () {
    return (
      <div className="app">
        <MoviesContext.Provider value={{
          movies: this.state.movies,
          addMovie: this.addMovie,
        }}>
          <div className="app-wrapper top">
            <Header />
            <MoviesList />
          </div>
          <div className="app-wrapper bottom">
            <AddMovie />
          </div>
        </MoviesContext.Provider>
      </div>
    );
  }
}

export default App;
