import React from 'react';

import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.copy}>Вадим Хмыз &copy; 2024</div>
        <div className={styles.contacts}>
          <a href="tel:+375296658473">тел. +375(29)665-84-73</a>
          <a href="mailto:vadimhmyz@gmail.com">vadimhmyz@gmail.com</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
