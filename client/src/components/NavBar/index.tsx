import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import styles from './NavBar.module.scss';

const NavBar: React.FC = () => {
  const { isAuth, isAdmin } = useSelector((state: RootState) => state.user);
  
  return (
    <div className={styles.root}>
      <div className={styles.nav}>
        {isAuth ? (
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
        {isAdmin && (
          <NavLink to="/admin" className={styles.nav__link}>
            Панель управления
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default NavBar;
