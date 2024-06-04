import React from 'react';

import styles from './Price.module.scss';

export default function Price({ price, currency, isBottom = false }) {
  let formatter = new Intl.NumberFormat('ru', {
    minimumFractionDigits: 2,
  });
  const priceView = formatter.format(price);
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
