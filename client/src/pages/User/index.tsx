import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../http/userAPI';
import Button from '../../ui-kit/Button';
import { logoutUser } from '../../redux/user/slice';
import { clearBasket } from '../../redux/basket/slice';

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
    <div>
      <h1>Личный кабинет</h1>
      <p>Это личный кабинет покупателя</p>
      <Button handleClick={handleLogout}>Выйти</Button>
    </div>
  );
};

export default User;
