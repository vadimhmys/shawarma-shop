import React from 'react';

import RadioBox from './RadioBox';

import styles from './Switcher.module.scss';

export default function Switcher({ switcherName, properties, items, onSwitch }) {
  return (
    <div className={styles.root}>
      {switcherName === 'weight'
        ? properties.map((property, index) => (
            <RadioBox
              key={property.id}
              id={property.id}
              name={switcherName}
              inputValue={property.price}
              labelValue={property.weight + ' гр.'}
              isChecked={items[index]}
              onSwitch={onSwitch}
            />
          ))
        : ''}
    </div>
  );
}
