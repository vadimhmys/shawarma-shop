import React from 'react';
import { useAppDispatch } from '../../../redux/store';
import { useSelector } from 'react-redux';
import { clearBasket } from '../../../redux/basket/slice';
import { fetchClearBasket } from '../../../redux/basket/asyncAction';
import { selectUser } from '../../../redux/user/selectors';

import styles from './BasketModalWindow.module.scss';

type BasketModalWindowPropsType = {
  hideModalWindow: () => void;
};

const BasketModalWindow: React.FC<BasketModalWindowPropsType> = ({ hideModalWindow }) => {
  const dispatch = useAppDispatch();
  const {id, isAuth} = useSelector(selectUser);

  const onClickClear = () => {
    if (isAuth && id) {
      dispatch(fetchClearBasket(id));
    } else {
      dispatch(clearBasket());
    }
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
