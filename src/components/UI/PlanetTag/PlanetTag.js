import React from 'react';
import close from '../../../assets/CLOSE.svg';
import styles  from "./PlanetTag.module.css";

function PlanetTag(props) {
  return (
    <div className={styles.planetTag}>
      <p>{props.children}</p>
      <button type="button" className={styles.closeButton} onClick={props.remove}><img src={close} alt="close" /></button>
    </div>
  );
};

export default PlanetTag;
