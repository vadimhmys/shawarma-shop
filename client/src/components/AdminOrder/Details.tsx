import React from 'react';
import ReactLoading from 'react-loading';
import { OrderDetailsType } from '../../redux/userOrders/types';
import { adminGetOne } from '../../http/orderAPI';
import { AddedComponentType } from '../UserOrder';
import styles from './AdminOrder.module.scss';

const Details: React.FC<{ id: number }> = ({ id }) => {
  const [items, setItems] = React.useState<OrderDetailsType[]>([]);
  const [fetching, setFetching] = React.useState(false);

  React.useEffect(() => {
    setFetching(true);
    adminGetOne(id)
      .then((order) => setItems(order.items))
      .catch(() => alert('Не удалось загрузить детали заказа'))
      .finally(() => setFetching(false));
  }, [id]);

  if (fetching) {
    return <ReactLoading type={'spin'} color={'red'} height={80} width={80} />;
  }

  return (
    <div className={styles.details}>
      {items.map((i) => {
        const addedComponents = JSON.parse(i.addedComponentsList).map((ac: AddedComponentType) => {
          return (
            <span key={ac.id}>
              {ac.name} {ac.count > 1 && `X${ac.count}`},{' '}
            </span>
          );
        });
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
                Название: <span className={styles.details__elemList__itemTitle}>{i.title}</span>
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
  );
};

export default Details;
