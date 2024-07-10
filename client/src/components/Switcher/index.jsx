import React from 'react';

import styles from './Switcher.module.scss';

export default function Switcher({
  radioBoxGroupName,
  dataForInputs,
  onParentStateChange,
  activeIndex,
}) {
  const handleChange = (index) => {
    onParentStateChange(index);
  };

  return (
    <div className={styles.root}>
      {dataForInputs.map((data, i) => (
        <div className={styles.radioBox} key={data.value}>
          <input
            type="radio"
            name={radioBoxGroupName}
            value={data.value}
            id={radioBoxGroupName + '--' + data.id}
            checked={activeIndex === i}
            onChange={() => handleChange(i)}
          />
          <label htmlFor={radioBoxGroupName + '--' + data.id}>{data.value}</label>
        </div>
      ))}
    </div>
  );
}
