import React from 'react';
import Price from './Price';

export default function Variant({ weight, price }) {
  return (
    <div className="variants__item">
      <div className="weight">{weight} г.</div>
      <Price price={price} currency="p." />
    </div>
  );
}
