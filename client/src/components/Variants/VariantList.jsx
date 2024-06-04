import React from 'react';

import VariantItem from './VariantItem';

import styles from './VariantList.module.scss';


export default function VariantList({ propertyList }) {
  return (
    <div className={styles.root}>
      {propertyList.map((p) => (
        <VariantItem key={p.id} weight={p.weight} price={p.price} />
      ))}
    </div>
  );
}
