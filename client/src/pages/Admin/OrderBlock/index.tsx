import React from 'react';
import ReactLoading from 'react-loading';
import { Button } from '../../../ui-kit';
import { adminGetAll } from '../../../http/orderAPI';
import AdminOrder from '../../../components/AdminOrder';
import styles from '../Admin.module.scss';

export type OrderForAdminType = {
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
  const [fetching, setFetching] = React.useState(false);

  React.useEffect(() => {
    setFetching(true);
    adminGetAll()
      .then((data) => setOrders(data))
      .catch(() => alert('Не удалось загрузить заказы'))
      .finally(() => setFetching(false));
  }, []);

  if (fetching) {
    return <ReactLoading type={'spin'} color={'red'} height={80} width={80} />;
  }

  return (
    <div className={styles.infoBlock}>
      <h3 className={styles.infoBlock__title}>Заказы</h3>
      <div className={styles.infoBlock__content}>
        <Button handleClick={() => setIsShowOrderList(!isShowOrderList)}>
          {isShowOrderList ? 'Скрыть' : 'Показать'} список
        </Button>
        {isShowOrderList && (
          <div className={styles.orders__wrapper}>
            {orders.map((order) => (
              <AdminOrder key={order.id} {...order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderBlock;
