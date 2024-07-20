import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import CheckAuth from '../CheckAuth/CheckAuth';

import styles from './NavBar.module.scss';

const NavBar: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <div className={styles.root}>
      <div className={styles.nav}>
        <CheckAuth>
          {user.isAuth ? (
            <NavLink to="/user" className={styles.nav__link}>
              Личный кабинет
            </NavLink>
          ) : (
            <>
              <NavLink to="/login" className={styles.nav__link}>
                Войти
              </NavLink>
              <NavLink to="/signup" className={styles.nav__link}>
                Регистрация
              </NavLink>
            </>
          )}
          {user.isAdmin && (
          <NavLink to="/admin" className={styles.nav__link}>
            Панель управления
          </NavLink>
        )}
        </CheckAuth>
      </div>
    </div>
  );
};

export default NavBar;
