import React, { Component } from 'react';
import styles from './MoviesList.module.css';
import Loader from '../UI/Loader/Loader.js';
import PlanetsDataTable from '../PlanetsData/PlanetsData.js';
import ExpandableTab from '../UI/ExpandableTab/ExpandableTab.js';
import { fetchFilms } from '../../helpers/helpers.js';
import MoviesContext from '../../context/MoviesContext.js';

class MoviesList extends Component {
  state = {
    films: null,
    error: null,
  };

  getMovies = async () => {
    const data = await fetchFilms()
      .catch(err => {
        this.setState({
          error: err
        });
      });

    this.setState({
      films: data.results
    });
  };

  async componentDidMount() {
    await this.getMovies();
  };

  render() {
    const { films, error } = this.state;

    return (
      <section className={styles.MoviesList}>

        {error &&
          <p className="error">Error: { error }</p>
        }

        {!films &&
          <Loader />
        }

        <MoviesContext.Consumer>
          {(context) =>
            films &&
              films.concat(context.movies).map((film) =>
                <ExpandableTab key={film.title} title={film.title}>
                  <PlanetsDataTable planets={film.planets} />
                </ExpandableTab>
              )
          }
        </MoviesContext.Consumer>
      </section>
    );
  };
};

export default MoviesList;