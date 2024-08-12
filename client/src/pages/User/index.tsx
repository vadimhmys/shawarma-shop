import React from 'react';
import { useAppDispatch } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../http/userAPI';
import Button from '../../ui-kit/Button';
import PageTitle from '../../components/PageTitle';
import UserOrder from '../../components/UserOrder';
import { logoutUser } from '../../redux/user/slice';
import { clearBasket } from '../../redux/basket/slice';
import styles from './User.module.scss';
import { fetchUserOrders } from '../../redux/userOrders/asyncAction';
import { useSelector } from 'react-redux';
import { selectUserOrders } from '../../redux/userOrders/selectors';
import type { UOType } from '../../redux/userOrders/types';

const User: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const orders = useSelector(selectUserOrders);
  const handleLogout = (e: React.MouseEvent) => {
    logout();
    dispatch(logoutUser());
    dispatch(clearBasket());
    navigate('/login', { replace: true });
  };

  const getUserOrders = React.useCallback(async () => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  React.useEffect(() => {
    getUserOrders();
  }, [getUserOrders]);

  const items = orders.map((o: UOType) => (
    <UserOrder
      key={o.id}
      prettyCreatedAt={o.prettyCreatedAt}
      waitingTime={o.waitingTime}
      payment={o.payment}
      amount={o.amount}
      status={o.status}
    />
  ));
  console.log(items);

  return (
    <div className={styles.root}>
      <PageTitle>Личный кабинет</PageTitle>
      <p className={styles.historyTitle}>История заказов</p>
      {items}
      <Button handleClick={handleLogout}>Выйти</Button>
    </div>
  );
};

export default User;
