import React from 'react';
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from 'react-icons/md';

import styles from './Sorting.module.scss';

export default function Sorting({ sortType, onChangeSort }) {
  const [isVisible, setIsVisible] = React.useState(false);

  const sortingTypes = [
    { value: 'цене ↑', sortCritery: 'price' },
    { value: 'цене ↓', sortCritery: '-price' },
    { value: 'алфавиту↑', sortCritery: 'title' },
    { value: 'алфавиту↓', sortCritery: '-title' },
  ];

  const handleClick = (obj) => {
    onChangeSort(obj);
    setIsVisible(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        {isVisible ? (
          <MdOutlineArrowDropDown size="30" style={{ color: '#323232' }} />
        ) : (
          <MdOutlineArrowDropUp size="30" style={{ color: '#323232' }} />
        )}
        <div className={styles.title}>
          <span>Сортировать по: </span>
          <span className={styles.criterion} onClick={() => setIsVisible(!isVisible)}>
            {sortType.value}
          </span>
        </div>
      </div>
      {isVisible && (
        <div className={styles.popup}>
          <ul className={styles.list}>
            {sortingTypes.map((obj, i) => (
              <li
                key={obj.value}
                className={
                  obj.value === sortType.value
                    ? `${styles.list__item} ${styles.active}`
                    : `${styles.list__item}`
                }
                onClick={() => handleClick(obj)}>
                {obj.value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
