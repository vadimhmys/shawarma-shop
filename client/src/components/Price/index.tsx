import React from 'react';
import { formatPrice } from '../../utils/formatPrice';

import styles from './Price.module.scss';

type PriceProps = {
  price: number;
  currency: string;
  isBottom?: boolean;
};

const Price: React.FC<PriceProps> = ({ price, currency, isBottom = false }) => {
  const priceView = formatPrice(price);
  const [rubles, kopecks] = priceView.split(',');

  const rubStyle: string = isBottom ? styles.rub : styles.rubles;
  const kopStyle: string = isBottom ? styles.kop : styles.kopecks;
  const curStyle: string = isBottom ? styles.cur : styles.currency;

  return (
    <div>
      <span className={rubStyle}>{rubles}</span>
      <sup className={kopStyle}>{kopecks}</sup>
      <sub className={curStyle}>{currency}</sub>
    </div>
  );
};

export default Price;
