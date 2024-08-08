import React from 'react';
import PageTitle from '../../components/PageTitle';
import OrderForm from './OrderForm';

const Order: React.FC = () => {
  return (
    <div>
      <PageTitle>Оформление заказа</PageTitle>
      <OrderForm/>
    </div>
  );
};

export default Order;
