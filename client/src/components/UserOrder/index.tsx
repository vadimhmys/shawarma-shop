import React from 'react';
import { Button } from '../../ui-kit';
import styles from './UserOrder.module.scss';

type UserOrderPropsType = {
  prettyCreatedAt: string;
  waitingTime: number;
  payment: 'CASH' | 'CARD';
  amount: string;
  status: number;
};

const UserOrder: React.FC<UserOrderPropsType> = ({
  prettyCreatedAt,
  waitingTime,
  payment,
  amount,
  status,
}) => {
  const [isShowDetails, setIsShowDetails] = React.useState(false);

  const handleClick = (e: React.MouseEvent) => {
    setIsShowDetails(!isShowDetails);
  };

  return (
    <div className={styles.root}>
      <div>
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
      </div>
      <Button handleClick={handleClick}>{isShowDetails ? 'Скрыть' : 'Показать'} детали</Button>
      {isShowDetails && (
        <div className={styles.details}>
          <div className={styles.details__elem}>
            <ul>
              <li className={styles.details__elemList__item}>
                Название: <span>Чикен</span>
              </li>
              <li className={styles.details__elemList__item}>
                Вес: <span>500</span> гр.
              </li>
              <li className={styles.details__elemList__item}>
                Цена: <span>12</span> руб.
              </li>
              <li className={styles.details__elemList__item}>
                Количество: <span>2</span>
              </li>
              <li className={styles.details__elemList__item}>
                Лепешка: <span>Сырная лепешка</span>
              </li>
              <li className={styles.details__elemList__item}>
                Добавлено: <span>Помидор</span>, <span>Горчичный соус</span>
              </li>
              <li className={styles.details__elemList__item}>
                Удалено: <span>Сырный соус</span>, <span>Соленый огурец</span>
              </li>
            </ul>
          </div>
          <div className={styles.details__elem}>
            <ul className={styles.details__elemList}>
              <li className={styles.details__elemList__item}>
                Название: <span>Барбекю</span>
              </li>
              <li className={styles.details__elemList__item}>
                Вес: <span>600</span> гр.
              </li>
              <li className={styles.details__elemList__item}>
                Цена: <span>13</span> руб.
              </li>
              <li className={styles.details__elemList__item}>
                Количество: <span>3</span>
              </li>
              <li className={styles.details__elemList__item}>
                Лепешка: <span>Обычная лепешка</span>
              </li>
              <li className={styles.details__elemList__item}>
                Добавлено: <span>Помидор</span>, <span>Горчичный соус</span>
              </li>
              <li className={styles.details__elemList__item}>
                Удалено: <span>Сырный соус</span>, <span>Соленый огурец</span>
              </li>
            </ul>
          </div>
          <div className={styles.details__elem}>
            <ul>
              <li className={styles.details__elemList__item}>
                Название: <span>Барбекю</span>
              </li>
              <li className={styles.details__elemList__item}>
                Вес: <span>600</span> гр.
              </li>
              <li className={styles.details__elemList__item}>
                Цена: <span>13</span> руб.
              </li>
              <li className={styles.details__elemList__item}>
                Количество: <span>3</span>
              </li>
              <li className={styles.details__elemList__item}>
                Лепешка: <span>Обычная лепешка</span>
              </li>
              <li className={styles.details__elemList__item}>
                Добавлено: <span>Помидор</span>, <span>Горчичный соус</span>
              </li>
              <li className={styles.details__elemList__item}>
                Удалено: <span>Сырный соус</span>, <span>Соленый огурец</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserOrder;
