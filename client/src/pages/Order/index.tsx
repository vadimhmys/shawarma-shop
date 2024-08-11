import React from 'react';
import PageTitle from '../../components/PageTitle';
import OrderForm from './OrderForm';
import { useSelector } from 'react-redux';
import { selectOrderStatus } from '../../redux/order/selectors';
import { StatusEnum } from '../../redux/order/types';

const Order: React.FC = () => {
  const status = useSelector(selectOrderStatus);

  if (status === StatusEnum.LOADING) {
    return <div>LOADING</div>
  }

  if (status === StatusEnum.ERROR) {
    return <div>ERROR</div>
  }

  return (
    <div>
      <PageTitle>Оформление заказа</PageTitle>
      <OrderForm/>
    </div>
  );
};

export default Order;
