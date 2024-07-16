import React from 'react';
import Price from '../../Price';

import styles from './VariantItem.module.scss';

type VariantItemProps = {
  weight: number;
  price: number;
};

const VariantItem: React.FC<VariantItemProps> = ({ weight, price }) => {
  return (
    <div className={styles.root}>
      <div className={styles.weight}>{weight} г.</div>
      <Price price={price} currency="p." />
    </div>
  );
};

export default VariantItem;
