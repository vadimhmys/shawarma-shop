import React from 'react';

export default function Price({ price, currency }) {
  let formatter = new Intl.NumberFormat('ru', {
    minimumFractionDigits: 2,
  });
  const priceView = formatter.format(price);
  const [rubles, kopecks] = priceView.split(',');

  return (
    <div className="price">
      <span className="rubles">{rubles}</span>
      <sup className="kopecks">{kopecks}</sup>
      <sub className="currency">{currency}</sub>
    </div>
  );
}
