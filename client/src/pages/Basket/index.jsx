import React from 'react';
import { useSelector } from 'react-redux';
import BasketItem from './BasketItem';

import styles from './Basket.module.scss';

export default function Basket() {
  const {items} = useSelector(state => state.basket);
  return (
    <div className={styles.root}>
      <h2 className={styles.title}>Корзина</h2>
      <ul className={styles.list}>
        {
          items.map(item => <BasketItem key={item.id + item.cake + item.weight + JSON.stringify(item.addedComponentsList)} {...item}/>)
        }
      </ul>
    </div>
  );
}
