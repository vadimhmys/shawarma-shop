import React from 'react';

import styles from './Counter.module.scss';

export default function Counter() {
  return (
    <div className={styles.root}>
      <p className={styles.sum}>0 р.</p>
      <div className={styles.counter}>
        <button className={styles.button}>&#8722;</button>
        <div className={styles.quantity}>
          <span>1</span>
          <span>x</span>
          <span>1.20 р</span>
        </div>
        <button className={styles.button}>&#43;</button>
      </div>
    </div>
  );
}
