import React from 'react';
import PageTitle from '../../components/PageTitle';
import OrderForm from './OrderForm';
import { useSelector } from 'react-redux';
import { selectOrderStatus } from '../../redux/order/selectors';
import { StatusEnum } from '../../redux/order/types';
import OrderError from './OrderError';

const Order: React.FC = () => {
  const status = useSelector(selectOrderStatus);

  if (status === StatusEnum.LOADING) {
    return <div>LOADING</div>
  }

  if (status === StatusEnum.ERROR) {
    return <OrderError/>
  }

  return (
    <div>
      <PageTitle>Оформление заказа</PageTitle>
      <OrderForm/>
    </div>
  );
};

export default Order;
