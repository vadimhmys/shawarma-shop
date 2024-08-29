import React from 'react';
import clsx from 'clsx';
import styles from '../Admin.module.scss';
import { Button } from '../../../ui-kit';
import { adminGetAll } from '../../../http/orderAPI';

type OrderForAdminType = {
  prettyCreatedAt: string;
  prettyUpdatedAt: string;
  id: number;
  userName: string;
  phone: string;
  waitingTime: number;
  comment: string;
  payment: 'CASH' | 'CARD';
  amount: string;
  status: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
};

const OrderBlock: React.FC = () => {
  const [isShowOrderList, setIsShowOrderList] = React.useState(false);
  const [orders, setOrders] = React.useState<OrderForAdminType[]>([]);

  React.useEffect(() => {
    adminGetAll()
      .then((data) => setOrders(data))
      .catch(() => alert('Не удалось загрузить заказы'));
  }, []);
  return (
    <div className={clsx(`${styles.infoBlock}`, `${styles.order}`)}>
      <h3 className={styles.infoBlock__title}>Заказы</h3>
      <div className={styles.infoBlock__content}>
        <Button handleClick={() => setIsShowOrderList(!isShowOrderList)}>
          {isShowOrderList ? 'Скрыть' : 'Показать'} список
        </Button>
        {isShowOrderList && (
          <ul>
            {orders.map((order) => (
              <li key={order.id}>
                {order.userName}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default OrderBlock;
