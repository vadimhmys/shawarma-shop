import React from 'react';
import { useDispatch } from 'react-redux';
import { clearBasket } from '../../../redux/slices/basketSlice';

import styles from './BasketModalWindow.module.scss';

type BasketModalWindowProps = {
  hideModalWindow: () => void;
};

const BasketModalWindow: React.FC<BasketModalWindowProps> = ({ hideModalWindow }) => {
  const dispatch = useDispatch();

  const onClickClear = () => {
    dispatch(clearBasket());
    hideModalWindow();
  };

  return (
    <div className={styles.root}>
      <div>
        <h2 className={styles.header}>Вы уверены, что хотите удалить всё из корзины?</h2>
        <div className={styles.btnBlock}>
          <button className={styles.btn} onClick={onClickClear}>
            Да
          </button>
          <button className={styles.btn} onClick={hideModalWindow}>
            Нет
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasketModalWindow;
