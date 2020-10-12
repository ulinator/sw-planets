import React from 'react';
import loader from '../../../assets/LOADER.svg';
import styles  from "./Loader.module.css";

function Loader() {
  return (
    <figure>
      <img className={styles.loader} src={loader} alt="Loading..." />
    </figure>
  );
};

export default Loader;