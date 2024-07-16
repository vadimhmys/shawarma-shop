import React from 'react';

import styles from './Novelty.module.scss';

const Novelty: React.FC = () => {
  return (
    <div className={styles.root}>
      <span className={styles.root__text}>New</span>
    </div>
  );
};

export default Novelty;
