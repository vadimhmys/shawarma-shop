import React from 'react';

import styles from './Switcher.module.scss';

export default function Switcher({ switcherName, properties, items, onSwitch }) {
  return (
    <div className={styles.root}>
      {switcherName.startsWith('weight')
        ? properties.map((property, index) => (
            <div className={styles.radioBox} key={property.id}>
              <input
                type="radio"
                name={switcherName + property.id}
                value={property.price}
                id={switcherName + property.id}
                checked={items[index]}
                onChange={onSwitch}
              />
              <label htmlFor={switcherName + property.id}>{property.weight + ' гр.'}</label>
            </div>
          ))
        : ''}
    </div>
  );
}
