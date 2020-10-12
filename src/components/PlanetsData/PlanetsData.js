import React, { Component, Fragment } from 'react';
import Loader from '../UI/Loader/Loader.js';
import { fetchData, compareValues } from '../../helpers/helpers.js';
import styles  from "./PlanetsData.module.css";

const sortOrder = {
  ASC: 'asc',
  DESC: 'desc'
};

class PlanetsData extends Component {
  state = {
    planetsData: null,
    sortedData: null,
    sortingOrder: sortOrder.ASC,
    loading: true,
    isDesktop: false,
  };

  fetchMoviePlanetsData = async () => {
    const { planets } = this.props;

    this.setState({
      loading: true,
    });

    const planetsData = await Promise.all(
      planets.map(
        async (planet) => await fetchData(planet)
      )
    );

    this.setState({
      planetsData: planetsData,
      loading: false,
    });
  };

  sortData = (key) => {
    this.setState((state) => {
      const sortedData = [...state.sortedData].sort(compareValues(key, state.sortingOrder));
      const newSortingOrder = state.sortingOrder === sortOrder.ASC ? sortOrder.DESC : sortOrder.ASC;

      return {
        sortedData: sortedData,
        sortingOrder: newSortingOrder,
      };
    });
  };

  toggleSortingOrder = () => {
    this.setState((state) => {
      const newSortingOrder = state.sortingOrder === sortOrder.ASC ? sortOrder.DESC : sortOrder.ASC;

      return {
        sortingOrder: newSortingOrder,
      };
    });
  };

  checkWidthAndSwitchView = () => {
    const desktopView = window.matchMedia("(min-width: 600px)");
    let isDesktop = desktopView.matches ? true : false;

    this.setState({
      isDesktop: isDesktop,
    });
  };

  async componentDidMount() {
    window.addEventListener("resize", this.checkWidthAndSwitchView);
    this.checkWidthAndSwitchView();

    await this.fetchMoviePlanetsData();

    this.setState((state) => {
      return {
        sortedData: [...state.planetsData]
      };
    });
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.checkWidthAndSwitchView);
  };

  render () {
    const { loading, sortedData, isDesktop } = this.state;
    const { sortData } = this;

    if (loading) {
      return <Loader />
    }

    const simplifiedTable =
      sortedData &&
      sortedData.map((planet) =>
        <table className={styles.planetsDataSimple} key={planet.url}>
          <tbody>
            <tr>
              <th>Planet Name</th>
              <td className={styles.planetName}>{planet.name}</td>
            </tr>
            <tr>
              <th>Rotation period</th>
              <td>{planet.rotation_period}</td>
            </tr>
            <tr>
              <th>Orbital period</th>
              <td>{planet.orbital_period}</td>
            </tr>
            <tr>
              <th>Diameter</th>
              <td>{planet.diameter}</td>
            </tr>
            <tr>
              <th>Climate</th>
              <td>{planet.climate}</td>
            </tr>
            <tr>
              <th>Surface water</th>
              <td>{planet.surface_water}</td>
            </tr>
            <tr>
              <th>Population</th>
              <td>{planet.population}</td>
            </tr>
          </tbody>
        </table>
      );

    const fullTable =
      <table className={styles.planetsDataTable}>
          <thead>
            <tr className={styles.grid}>
              <th className={styles.planetName} onClick={() => sortData('name')}>Planet Name<span className={styles.sortArrows}></span></th>
              <th onClick={() => sortData('rotation_period')}>Rotation period<span className={styles.sortArrows}></span></th>
              <th onClick={() => sortData('orbital_period')}>Orbital period<span className={styles.sortArrows}></span></th>
              <th onClick={() => sortData('diameter')}>Diameter<span className={styles.sortArrows}></span></th>
              <th onClick={() => sortData('climate')}>Climate<span className={styles.sortArrows}></span></th>
              <th onClick={() => sortData('surface_water')}>Surface water<span className={styles.sortArrows}></span></th>
              <th onClick={() => sortData('population')}>Population<span className={styles.sortArrows}></span></th>
            </tr>
          </thead>

          <tbody>
          { sortedData &&
            sortedData.map((planet) =>
              <tr key={planet.url} className={styles.grid}>
                <td className={styles.planetName}>{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
              </tr>
            )
          }
          </tbody>
        </table>;

    return (
      <Fragment>
        { isDesktop ? fullTable: simplifiedTable }
      </Fragment>
    );
  };
}

export default PlanetsData;