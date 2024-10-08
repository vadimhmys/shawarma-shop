import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BasketItemType } from '../../redux/basket/types';
import { selectBasketItems } from '../../redux/basket/selectors';
import { selectUserIsAuth } from '../../redux/user/selectors';
import { getTotalPrice } from '../../utils/getTotalPrice';
import BasketItem from './BasketItem';
import Button from '../../ui-kit/Button';
import BasketModalWindow from './BasketModalWindow';
import EmptyBasket from './EmptyBasket';
import PageTitle from '../../components/PageTitle';
import styles from './Basket.module.scss';

const Basket: React.FC = () => {
  const navigate = useNavigate();
  const isAuth = useSelector(selectUserIsAuth);
  const items = useSelector(selectBasketItems);
  const [isModalWindowVisible, setIsModalWindowVisible] = React.useState(false);
  const totalCount = items.reduce((sum: number, item: BasketItemType) => sum + item.count, 0);
  const totalPrice = getTotalPrice(items);
  const isEmpty = items.length === 0;

  const showModalWindow = () => {
    setIsModalWindowVisible(true);
  };

  const hideModalWindow = () => {
    setIsModalWindowVisible(false);
  };

  const handleClick = () => {
    if (!isAuth) {
      navigate('/login');
    } else {
      navigate('/order');
    }
  };

  if (isEmpty) return <EmptyBasket />;

  return (
    <div className={styles.root}>
      <PageTitle>Корзина</PageTitle>
      <button className={styles.clearBtn} onClick={showModalWindow}>
        Очистить корзину
      </button>
      <ul className={styles.list}>
        {items.map((item: BasketItemType) => (
          <BasketItem
            key={
              item.id +
              item.cake +
              item.weight +
              JSON.stringify(item.addedComponentsList) +
              JSON.stringify(item.removedComponentsList)
            }
            {...item}
          />
        ))}
      </ul>
      <div className={styles.bottom}>
        <p className={styles.text}>
          Общее количество шавух: <span>{totalCount}</span> на сумму <span>{totalPrice}</span> руб.
        </p>
        <Button handleClick={handleClick}>К оформлению заказа</Button>
      </div>
      {isModalWindowVisible && <BasketModalWindow hideModalWindow={hideModalWindow} />}
    </div>
  );
};

export default Basket;
