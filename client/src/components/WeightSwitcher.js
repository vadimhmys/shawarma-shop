import React, { useState } from 'react';
import RadioBox from './RadioBox';

export default function WeightSwitcher({ variants }) {
  const [items, setItems] = useState([true, ...Array(variants.length - 1).fill(false)]);
  const handleChange = (e) => {
    setItems(variants.map((v) => v.id === e.target.id));
  };
  return (
    <div className="card__weight-switcher">
      {variants.map((v, i) => (
        <RadioBox
          key={v.id}
          id={v.id}
          price={v.price}
          weight={v.weight}
          isChecked={items[i]}
          handleChange={handleChange}
        />
      ))}
    </div>
  );
}
