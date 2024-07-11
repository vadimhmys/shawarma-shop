import React from 'react';
import { useSelector } from 'react-redux';
import { formatPrice } from '../../utils/formatPrice';
import BasketItem from './BasketItem';
import Button from '../../components/Button';
import BasketModalWindow from './BasketModalWindow';

import styles from './Basket.module.scss';

export default function Basket() {
  const items = useSelector(state => state.basket.items);
  const [isModalWindowVisible, setIsModalWindowVisible] = React.useState(false);
  const totalCount = items.reduce((sum, item) => sum + item.count, 0);
  const totalPrice = formatPrice(items.reduce((sum, item) => sum + item.count * parseFloat(item.price.replace(',','.')), 0));

  const showModalWindow = () => {
    setIsModalWindowVisible(true);
  };

  const hideModalWindow = () => {
    setIsModalWindowVisible(false);
  };

  return (
    <div className={styles.root}>
      <h2 className={styles.title}>Корзина</h2>
      <button className={styles.clearBtn} onClick={showModalWindow} >Очистить корзину</button>
      <ul className={styles.list}>
        {
          items.map(item => <BasketItem key={item.id + item.cake + item.weight + JSON.stringify(item.addedComponentsList)} {...item}/>)
        }
      </ul>
      <div className={styles.bottom}>
        <p className={styles.text}>Общее количество шавух: <span>{totalCount}</span> на сумму <span>{totalPrice}</span> руб.</p>
        <Button>Оформить заказ</Button>
      </div>
      {
        isModalWindowVisible && <BasketModalWindow hideModalWindow={hideModalWindow}/>
      }
    </div>
  );
}
