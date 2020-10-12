import React, { Component } from 'react';
import { searchPlanets, validateTitle, validatePlanets } from '../../helpers/helpers.js';
import ExpandableTab from '../UI/ExpandableTab/ExpandableTab.js';
import SelectSearch from 'react-select-search';
import PlanetTag from '../UI/PlanetTag/PlanetTag.js';
import MoviesContext from '../../context/MoviesContext.js';
import styles  from "./AddMovie.module.css";

class AddMovie extends Component {
  state = {
    movieTitle: '',
    searchQuery: '',
    selectedPlanets: [],
    searchResults: null,
    titleValidated: true,
    planetValidated: true,
  };

  handleTitleChange = (event) => {
    const { value } = event.target;

    this.setState({
      movieTitle: value,
      titleValidated: validateTitle(value),
    });
  };

  handlePlanetAdd = (value, data) => {
    const { name } = data;
    const hasDuplicate = this.state.selectedPlanets.find((planet) => planet.name === name);

    if (hasDuplicate) {
      return
    }

    this.setState((state) => {
      const newPlanets = [...state.selectedPlanets, { name, value }];

      return {
        selectedPlanets: newPlanets,
        searchQuery: '',
        planetValidated: validatePlanets(newPlanets),
      };
    });
  };

  handleSearchValue = (event) => {
    this.setState({
      searchQuery: event.target.value
    });
  };

  handleSubmit = (context) => {
    const { movieTitle, selectedPlanets } = this.state;
    const titleValidated = validateTitle(movieTitle);
    const planetsValidated = validatePlanets(selectedPlanets);

    if (!titleValidated) {
      this.setState({
        titleValidated: false,
      });
    }

    if (!planetsValidated) {
      this.setState({
        planetValidated: false,
      });
    }

    if (!(titleValidated && planetsValidated)) {
      return
    }

    const planetsUrls = selectedPlanets.map((planet) => planet.value);
    const newMovie = { title: movieTitle, planets: planetsUrls }

    context.addMovie(newMovie);

    this.setState({
      movieTitle: '',
      selectedPlanets: [],
    });
  };

  getOptions = async () => {
    const { searchQuery } = this.state;
    const searchResults = await searchPlanets(searchQuery);

    this.setState({
      searchResults: searchResults,
    });
  };

  removeTag = (planetNameToRemove) => {
    this.setState((state) => {
      const filteredPlanets = state.selectedPlanets.filter((planet) => {
        return planet.name !== planetNameToRemove;
      });

      return {
        selectedPlanets: filteredPlanets,
        planetsValidated: validatePlanets(filteredPlanets),
      };
    });
  };

  render () {
    const { selectedPlanets, movieTitle, planetValidated, titleValidated } = this.state;
    const { handleTitleChange, handleSubmit, handlePlanetAdd } = this;

    const planetTags = selectedPlanets.map((planet) => <PlanetTag key={planet.name} remove={() => this.removeTag(planet.name)}>{planet.name}</PlanetTag>)

    return (
      <ExpandableTab title={"Add Movie"}>
        <form className={styles.formWrapper}>
          <label className={styles.formLabel}>Movie title:
            <input name="title"
              className={styles.input}
              type="text"
              placeholder="Enter the movie title"
              value={movieTitle}
              onChange={handleTitleChange} />
          </label>
          { !titleValidated &&
            <p className={styles.validateInfo}>The title must start with a capital letter and be at least 3 letters long.</p>
          }
          { planetTags &&
            <div className={styles.planetTags}>
              {planetTags}
            </div>
          }

          <label className={styles.formLabel}>Add planet:
            <SelectSearch
              onChange={handlePlanetAdd}
              options={[]}
              getOptions={(query) => {
                return new Promise((resolve, reject) => {
                  searchPlanets(query)
                    .then((data) => {
                      resolve(data.results.map((planet) => ({ value: planet.url, name: planet.name })))
                    })
                });
              }}
              value={[]}
              search
              placeholder="Search for the the planet in database"
              printOptions="always"
            />
          </label>
          { !planetValidated &&
            <p className={styles.validateInfo}>Add at least one planet.</p>
          }
          <MoviesContext.Consumer>
            {(context) =>
              <button className={styles.button}
                type="button"
                disabled={!(titleValidated && planetValidated)}
                onClick={() => handleSubmit(context)}
              >Add Movie
              </button>
            }
          </MoviesContext.Consumer>
        </form>
      </ExpandableTab>
    );
  };
};

export default AddMovie;