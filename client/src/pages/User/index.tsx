import React from 'react';
import ReactLoading from 'react-loading';
import { useAppDispatch } from '../../redux/store';
import { fetchUserOrders } from '../../redux/userOrders/asyncAction';
import { useSelector } from 'react-redux';
import { selectUserOrders } from '../../redux/userOrders/selectors';
import { StatusEnum, type UOType } from '../../redux/userOrders/types';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../http/userAPI';
import Button from '../../ui-kit/Button';
import PageTitle from '../../components/PageTitle';
import UserOrder from '../../components/UserOrder';
import { logoutUser } from '../../redux/user/slice';
import { clearBasket } from '../../redux/basket/slice';
import styles from './User.module.scss';

const User: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { orders, status } = useSelector(selectUserOrders);

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
      items={o.items}
    />
  ));

  return (
    <div className={styles.root}>
      <PageTitle>Личный кабинет</PageTitle>
      <p className={styles.historyTitle}>История заказов</p>
      {status === StatusEnum.ERROR ? (
        <div className={styles.errorInfo}>
          <h2 className={styles.errorInfo__title}>Ошибка получения заказов</h2>
          <p className={styles.errorInfo__text}>
            К сожалению не удалось получить данные о заказах, повторите запрос позже
          </p>
        </div>
      ) : (
        <>
          {status === StatusEnum.LOADING ? (
            <div className={styles.loaderWrapper}>
              <ReactLoading type={'spin'} color={'red'} height={80} width={80} />
            </div>
          ) : (
            items
          )}
        </>
      )}
      <Button handleClick={handleLogout}>Выйти</Button>
    </div>
  );
};

export default User;
