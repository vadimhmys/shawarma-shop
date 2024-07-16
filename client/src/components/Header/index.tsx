import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectBasketItems } from '../../redux/slices/basketSlice';
import { BsFillCartFill } from 'react-icons/bs';
import Search from '../Search';
import { formatPrice } from '../../utils/formatPrice';

import styles from './Header.module.scss';

const Header: React.FC = () => {
  const items = useSelector(selectBasketItems);
  const totalCount = items.reduce((sum: number, item: any) => sum + item.count, 0);
  const totalPrice = formatPrice(
    items.reduce(
      (sum: number, item: any) => sum + item.count * parseFloat(item.price.replace(',', '.')),
      0,
    ),
  );
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to="/">
            <img
              className={styles.logo__img}
              width="90"
              src="../../images/logo.svg"
              alt="Шаурма логотип"
            />
          </Link>
          <div>
            <h1 className={styles.logo__title}>Шаверма</h1>
            <p className={styles.logo__subtitle}>лучшая шаурма в мире</p>
          </div>
        </div>
        <Search />
        <div className={styles.cart}>
          <Link to="/basket" className={styles.cart__link}>
            <span className={styles.cart__price}>{totalPrice} руб.</span>
            <BsFillCartFill
              className={styles.cart__icon}
              style={{ color: '#df9408', transition: '0.15s' }}
              onMouseOver={({ currentTarget }) => (currentTarget.style.color = '#ffa400')}
              onMouseLeave={({ currentTarget }) => (currentTarget.style.color = '#df9408')}
            />
            <div className={styles.cart__circle}>
              <span>{totalCount}</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
