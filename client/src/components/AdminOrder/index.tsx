import React from 'react';
import clsx from 'clsx';
import { Button } from '../../ui-kit';
import { OrderForAdminType } from '../../pages/Admin/OrderBlock';
import Details from './Details';
import styles from './AdminOrder.module.scss';

const AdminOrder: React.FC<OrderForAdminType> = ({
  id,
  userName,
  phone,
  prettyCreatedAt,
  waitingTime,
  comment,
  payment,
  amount,
  status,
}) => {
  const [isShowDetails, setIsShowDetails] = React.useState(false);

  const toggleDisplayingDiteils = () => {
    setIsShowDetails(!isShowDetails);
  };

  const finishOrder = () => {
    console.log('Завершить заказ');
  };

  const removeOrder = () => {
    console.log('Удалить заказ');
  };

  return (
    <div className={clsx(`${styles.root}`, status !== 0 && `${styles.finished}`)}>
      <ul>
        <li className={styles.mainInfo__list__item}>
          Номер заказа: <span>{id}</span>
        </li>
        <li className={styles.mainInfo__list__item}>
          Имя: <span>{userName}</span>
        </li>
        <li className={styles.mainInfo__list__item}>
          Телефон: <span>{phone}</span>
        </li>
        <li className={styles.mainInfo__list__item}>
          Дата: <span>{prettyCreatedAt}</span>
        </li>
        <li className={styles.mainInfo__list__item}>
          Время ожидания: <span>{waitingTime}</span> мин.
        </li>
        <li className={styles.mainInfo__list__item}>
          Комментарий: <span>{comment}</span>
        </li>
        <li className={styles.mainInfo__list__item}>
          Сумма: <span>{amount}</span> руб.
        </li>
        <li className={styles.mainInfo__list__item}>
          Способ оплаты: <span>{payment === 'CASH' ? 'Наличными' : 'Картой'}</span>
        </li>
        <li className={styles.mainInfo__list__item}>
          Статус: <span>{status === 0 ? 'Готовится' : 'Приготовлен'}</span>
        </li>
      </ul>
      <div className={styles.btnsWrapper}>
        <Button handleClick={toggleDisplayingDiteils}>
          {isShowDetails ? 'Скрыть' : 'Показать'} детали
        </Button>
        <Button handleClick={finishOrder}>Завершить заказ</Button>
        <Button handleClick={removeOrder}>Удалить заказ</Button>
      </div>
      {isShowDetails && <Details id={id} />}
    </div>
  );
};

export default AdminOrder;
