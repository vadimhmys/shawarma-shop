import React from 'react';

import styles from './Switcher.module.scss';

type SwitcherDataType = {
  id: number;
  value: string;
};

type SwitcherPropsType = {
  radioBoxGroupName: string;
  dataForInputs: SwitcherDataType[];
  onParentStateChange: (idx: number) => void;
  activeIndex: number;
};

const Switcher: React.FC<SwitcherPropsType> = ({
  radioBoxGroupName,
  dataForInputs,
  onParentStateChange,
  activeIndex,
}) => {
  const handleChange = (index: number) => {
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
};

export default Switcher;
