import React from 'react';

import styles from './Button.module.scss';

export default function Button({ children, handleClick }) {
  return (
    <button className={styles.root} onClick={handleClick}>
      {children}
    </button>
  );
}
