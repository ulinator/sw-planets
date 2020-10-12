import React, { Component } from 'react';
import arrow_open from '../../../assets/ARROW_OPEN.svg';
import arrow_close from '../../../assets/ARROW_CLOSE.svg';
import styles  from "./ExpandableTab.module.css";

class ExpandableTab extends Component {
  state = {
    isExpanded: false,
  };

  toggleExpanded = () => {
    this.setState((state) => {
      return { isExpanded: !state.isExpanded };
    });
  };

  render() {
    const { isExpanded } = this.state;
    const arrowImg = isExpanded ? arrow_close : arrow_open;

    return (
      <div className={`${styles.expandableTab} ${isExpanded ? styles.expanded : ""}`}>
        <div className={styles.expandableHeader} onClick={this.toggleExpanded}>
          <h2 className={styles.title}>{this.props.title}</h2>

          <img className={styles.toggleImage} src={arrowImg} alt="Toggle expanded" />
        </div>

        { isExpanded &&
          <section className={styles.expandedSection}>
            {this.props.children}
          </section>
        }
      </div>
    );
  };
};

export default ExpandableTab;
