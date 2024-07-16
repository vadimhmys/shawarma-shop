import React from 'react';
import VariantItem from './VariantItem';

import styles from './VariantList.module.scss';

import type { CardProperty } from '../Card';

type VariantListProps = {
  propertyList: CardProperty[];
};

const VariantList: React.FC<VariantListProps> = ({ propertyList }) => {
  return (
    <div className={styles.root}>
      {propertyList.map((p) => (
        <VariantItem key={p.id} weight={p.weight} price={p.price} />
      ))}
    </div>
  );
};

export default VariantList;
