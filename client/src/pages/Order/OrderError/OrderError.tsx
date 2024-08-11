import React from 'react';
import styles from './OrderError.module.scss';
import { clearOrder } from '../../../redux/order/slice';
import { useAppDispatch } from '../../../redux/store';
import { fetchOrder } from '../../../redux/order/asyncAction';
import { useSelector } from 'react-redux';
import { selectOrder } from '../../../redux/order/selectors';
import { StatusEnum } from '../../../redux/order/types';

export const OrderError: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, userName, phone, waitingTime, comment, payment, status } =
    useSelector(selectOrder);

  const handleCancelClick = () => {
    dispatch(clearOrder());
  };

  const handleSendClick = () => {
    dispatch(fetchOrder({ items, userName, phone, waitingTime, comment, payment }));
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>
        <b>Ошибка!</b> Не удалось отправить данные на сервер
      </h2>
      <p className={styles.message}>Попробуйте повторить попытку еще раз!</p>
      {status === StatusEnum.LOADING ? (
        <div className={styles.skeleton}></div>
      ) : (
        <img
          className={styles.image}
          src="images/desable_server_icon.png"
          alt="desable server icon"
        />
      )}
      <button className={styles.btn} onClick={handleSendClick}>
        Попробовать ещё
      </button>
      <button className={styles.btn} onClick={handleCancelClick}>
        Отмена
      </button>
    </div>
  );
};
