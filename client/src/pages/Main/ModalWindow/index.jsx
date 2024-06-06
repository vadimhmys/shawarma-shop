import React from 'react';

import styles from './ModalWindow.module.scss';

export default function ModalWindow({ hideModalWindow }) {
  return (
    <div className={styles.background__showed}>
      <div className={styles.body}>
        <div className={styles.close} onClick={hideModalWindow}></div>
        <h2 className={styles.title}>Шаварма Кебаб</h2>
        <div className={styles.content}>
          <div className={styles.info}>
            <span>300 г.</span>
            {', '}
            <span>Лепешка</span>
          </div>
        </div>
      </div>
    </div>
  );
}
