import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button';

import styles from './EmptyBasket.module.scss';

export default function EmptyBasket() {
  return (
    <div className={styles.root}>
      <h2 className={styles.title}>Ваша корзина пуста!</h2>
      <p className={styles.text}>
        Чтобы добавить в корзину какой-либо продукт перейдите на главную страницу
      </p>
      <img className={styles.image} src="images/shoppingcart.png" alt="Empty basket img" />
      <Link to='/'>
        <Button>На главную</Button>
      </Link>
    </div>
  );
}
