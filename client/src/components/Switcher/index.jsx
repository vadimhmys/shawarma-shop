import React from 'react';

import styles from './Switcher.module.scss';

export default function Switcher({ radioBoxGroupName, dataForInputs, onParentStateChange = null }) {
  const [checkedIndex, setCheckedIndex] = React.useState(0);

  const handleChange = (index) => {
    setCheckedIndex(index);
    if (onParentStateChange) onParentStateChange(index);
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
            checked={checkedIndex === i}
            onChange={() => handleChange(i)}
          />
          <label htmlFor={radioBoxGroupName + '--' + data.id}>{data.value}</label>
        </div>
      ))}
    </div>
  );
}
