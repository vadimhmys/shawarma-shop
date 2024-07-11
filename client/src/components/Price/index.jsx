import React from 'react';
import { formatPrice } from '../../utils/formatPrice';

import styles from './Price.module.scss';

export default function Price({ price, currency, isBottom = false }) {
  
  const priceView = formatPrice(price);
  const [rubles, kopecks] = priceView.split(',');

  const rubStyle = isBottom ? styles.rub : styles.rubles;
  const kopStyle = isBottom ? styles.kop : styles.kopecks;
  const curStyle = isBottom ? styles.cur : styles.currency;

  return (
    <div>
      <span className={rubStyle}>{rubles}</span>
      <sup className={kopStyle}>{kopecks}</sup>
      <sub className={curStyle}>{currency}</sub>
    </div>
  );
}
