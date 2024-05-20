import React from 'react';

export default function Variant({weight}) {
  return (
    <div className="variants__item">
      <div className="weight">{weight} г.</div>
      <div className="price">
        <span className="rubles">5</span>
        <sup className="kopecks">90</sup>
        <sub className="currency">р.</sub>
      </div>
    </div>
  );
}
