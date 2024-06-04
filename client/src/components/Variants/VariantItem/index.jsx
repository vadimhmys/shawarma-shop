import React from 'react';

import Price from '../../Price';

import styles from './VariantItem.module.scss';

export default function VariantItem({ weight, price }) {
  return (
    <div className={styles.root}>
      <div className={styles.weight}>{weight} г.</div>
      <Price price={price} currency="p." />
    </div>
  );
}
