import React from 'react';

import { BsFillCartFill } from 'react-icons/bs';

import styles from './Header.module.scss';

export default function Header() {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img
            className={styles.logo__img}
            width="90"
            src="../../images/logo.svg"
            alt="Шаурма логотип"
          />
          <div>
            <h1 className={styles.logo__title}>Шаверма</h1>
            <p className={styles.logo__subtitle}>лучшая шаурма в мире</p>
          </div>
        </div>
        <div className={styles.cart}>
          <a href="/cart.html" className={styles.cart__link}>
            <span className={styles.cart__price}>0 руб.</span>
            <BsFillCartFill
              size="40"
              style={{ color: '#df9408', transition: '0.15s' }}
              onMouseOver={({ currentTarget }) => (currentTarget.style.color = '#ffa400')}
              onMouseLeave={({ currentTarget }) => (currentTarget.style.color = '#df9408')}
            />
            <div className={styles.cart__circle}>
              <span>0</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
