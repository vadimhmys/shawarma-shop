import React from 'react';
import ReactLoading from 'react-loading';
import PageTitle from '../../components/PageTitle';
import OrderForm from './OrderForm';
import { useSelector } from 'react-redux';
import { selectOrderStatus } from '../../redux/order/selectors';
import { StatusEnum } from '../../redux/order/types';
import OrderError from './OrderError';
import styles from './Order.module.scss';

const Order: React.FC = () => {
  const status = useSelector(selectOrderStatus);

  if (status === StatusEnum.LOADING) {
    return (
      <div className={styles.loaderWrapper}>
        <ReactLoading type={'spin'} color={'red'} height={80} width={80} />
      </div>
    );
  }

  if (status === StatusEnum.ERROR) {
    return <OrderError />;
  }

  return (
    <div>
      <PageTitle>Оформление заказа</PageTitle>
      <OrderForm />
    </div>
  );
};

export default Order;
