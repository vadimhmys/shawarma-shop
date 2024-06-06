import React from 'react';

import styles from './ModalWindow.module.scss';

export default function ModalWindow({ hideModalWindow, shawarma }) {
  console.log('active shawa: ', shawarma);
  return (
    <div className={styles.background__showed}>
      <div className={styles.body}>
        <div className={styles.close} onClick={hideModalWindow}></div>
        <h2 className={styles.title}>{shawarma.name}</h2>
        <div className={styles.content}>
          <div className={styles.info}>
            <span>{shawarma.props[0].weight} г.</span>
            {', '}
            <span>Лепешка</span>
          </div>
          <div className={styles.components}>
            {shawarma.components.map((c) => (
              <span key={c.id}>{c.name}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
