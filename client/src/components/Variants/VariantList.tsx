import React from 'react';
import VariantItem from './VariantItem';

import styles from './VariantList.module.scss';

import type { CardPropertyType } from '../../redux/slices/shawarmasSlice';

type VariantListPropsType = {
  propertyList: CardPropertyType[];
};

const VariantList: React.FC<VariantListPropsType> = ({ propertyList }) => {
  return (
    <div className={styles.root}>
      {propertyList.map((p) => (
        <VariantItem key={p.id} weight={p.weight} price={p.price} />
      ))}
    </div>
  );
};

export default VariantList;
