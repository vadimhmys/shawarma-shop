import React from 'react';

import styles from './RadioBox.module.scss';

export default function RadioBox({ id, name, isChecked, inputValue, labelValue, onSwitch }) {
  return (
    <div className={styles.root}>
      <input
        type="radio"
        name={name + id}
        value={inputValue}
        id={id}
        checked={isChecked}
        onChange={onSwitch}
      />
      <label htmlFor={id}>{labelValue}</label>
    </div>
  );
}
