import React from 'react';

import styles from './EmptyBasket.module.scss';

export default function EmptyBasket() {
  return (
    <div className={styles.root}>
      <h2 className={styles.title}>Ваша корзина пуста!</h2>
      <p className={styles.text}>Чтобы сделать заказ добавьте в корзину какой-либо продукт</p>
      <img className={styles.image} src='images/shoppingcart.png' alt='Empty basket img'/>
    </div>
  )
}
