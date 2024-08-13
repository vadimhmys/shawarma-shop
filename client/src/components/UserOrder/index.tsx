import React from 'react';
import clsx from 'clsx';
import { Button } from '../../ui-kit';
import { OrderDetailsType } from '../../redux/userOrders/types';
import styles from './UserOrder.module.scss';

type UserOrderPropsType = {
  prettyCreatedAt: string;
  waitingTime: number;
  payment: 'CASH' | 'CARD';
  amount: string;
  status: number;
  items: OrderDetailsType[];
};

type AddedComponentType = {
  id: number;
  name: string;
  count: number;
  price: number;
};

const UserOrder: React.FC<UserOrderPropsType> = ({
  prettyCreatedAt,
  waitingTime,
  payment,
  amount,
  status,
  items,
}) => {
  const [isShowDetails, setIsShowDetails] = React.useState(false);

  const handleClick = (e: React.MouseEvent) => {
    setIsShowDetails(!isShowDetails);
  };

  return (
    <div className={clsx(`${styles.root}`, status !== 0 && `${styles.finished}`)}>
      <ul>
        <li className={styles.mainInfo__list__item}>
          Дата и время: <span>{prettyCreatedAt}</span>
        </li>
        <li className={styles.mainInfo__list__item}>
          Время ожидания: <span>{waitingTime}</span> мин.
        </li>
        <li className={styles.mainInfo__list__item}>
          Способ оплаты: <span>{payment === 'CASH' ? 'Наличными' : 'Картой'}</span>
        </li>
        <li className={styles.mainInfo__list__item}>
          Стоимость: <span>{amount}</span> руб.
        </li>
        <li className={styles.mainInfo__list__item}>
          Статус: <span>{status === 0 ? 'Готовится' : 'Приготовлен'}</span>
        </li>
      </ul>
      <Button handleClick={handleClick}>{isShowDetails ? 'Скрыть' : 'Показать'} детали</Button>
      {isShowDetails && (
        <div className={styles.details}>
          {items.map((i) => {
            const addedComponents = JSON.parse(i.addedComponentsList).map(
              (ac: AddedComponentType) => {
                return (
                  <span key={ac.id}>
                    {ac.name} {ac.count > 1 && `X${ac.count}`},{' '}
                  </span>
                );
              },
            );
            const removedComponents = JSON.parse(i.removedComponentsList);
            return (
              <div
                key={
                  i.title +
                  i.weight +
                  i.price +
                  i.count +
                  i.cake +
                  i.addedComponentsList +
                  i.removedComponentsList
                }
                className={styles.details__elem}>
                <ul>
                  <li className={styles.details__elemList__item}>
                    Название: <span>{i.title}</span>
                  </li>
                  <li className={styles.details__elemList__item}>
                    Вес: <span>{i.weight}</span> гр.
                  </li>
                  <li className={styles.details__elemList__item}>
                    Цена: <span>{i.price}</span> руб.
                  </li>
                  <li className={styles.details__elemList__item}>
                    Количество: <span>{i.count}</span>
                  </li>
                  <li className={styles.details__elemList__item}>
                    Лепешка: <span>{i.cake}</span>
                  </li>
                  {addedComponents.length !== 0 && (
                    <li className={styles.details__elemList__item}>
                      Добавлено: <span>{[addedComponents]}</span>
                    </li>
                  )}
                  {removedComponents.length !== 0 && (
                    <li className={styles.details__elemList__item}>
                      Удалено: <span>{removedComponents.join(', ')}</span>
                    </li>
                  )}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserOrder;
