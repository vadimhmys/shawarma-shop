import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../http/userAPI';
import Button from '../../ui-kit/Button';
import PageTitle from '../../components/PageTitle';
import UserOrder from '../../components/UserOrder';
import { logoutUser } from '../../redux/user/slice';
import { clearBasket } from '../../redux/basket/slice';
import styles from './User.module.scss';

const User: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = (e: React.MouseEvent) => {
    logout();
    dispatch(logoutUser());
    dispatch(clearBasket());
    navigate('/login', { replace: true });
  };
  return (
    <div className={styles.root}>
      <PageTitle>Личный кабинет</PageTitle>
      <p className={styles.historyTitle}>История заказов</p>
      <UserOrder/>
      <UserOrder/>
      <Button handleClick={handleLogout}>Выйти</Button>
    </div>
  );
};

export default User;
