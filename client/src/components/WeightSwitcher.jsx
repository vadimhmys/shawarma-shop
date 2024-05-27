import React from 'react';
import RadioBox from './RadioBox';

export default function WeightSwitcher({ properties, items, onSwitch }) {
  return (
    <div className="card__weight-switcher">
      {properties.map((property, index) => (
        <RadioBox
          key={property.id}
          id={property.id}
          price={property.price}
          weight={property.weight}
          isChecked={items[index]}
          onSwitch={onSwitch}
        />
      ))}
    </div>
  );
}
