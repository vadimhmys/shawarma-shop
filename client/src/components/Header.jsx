import React from 'react';
import { BsFillCartFill } from 'react-icons/bs';

export default function Header() {
  return (
    <div className="header">
      <div className="container">
        <div className="header__logo">
          <img
            className="header__logo-img"
            width="90"
            src="../../images/logo.svg"
            alt="Шаурма логотип"
          />
          <div className="header__logo-content">
            <h1 className="header__logo-title">Шаверма</h1>
            <p className="header__logo-subtitle">лучшая шаурма в мире</p>
          </div>
        </div>
        <div className="header__cart">
          <a href="/cart.html" className="header__cart-link">
            <span className="header__cart-price">0 руб.</span>
            <BsFillCartFill
              size="40"
              style={{ color: '#df9408', transition: '0.15s' }}
              onMouseOver={({ currentTarget }) => (currentTarget.style.color = '#ffa400')}
              onMouseLeave={({ currentTarget }) => (currentTarget.style.color = '#df9408')}
            />
            <div className="header__cart-circle">
              <span>0</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}