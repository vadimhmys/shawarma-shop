import React from 'react';
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from 'react-icons/md';

import styles from './Sorting.module.scss';

export default function Sorting() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const signs = ['произвольно', 'цене', 'алфавиту'];

  const handleClick = (index) => {
    setActiveIndex(index);
    setIsVisible(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        {isVisible ? (
          <MdOutlineArrowDropDown size="30" style={{ color: '#323232', marginRight: '10' }} />
        ) : (
          <MdOutlineArrowDropUp size="30" style={{ color: '#323232', marginRight: '10' }} />
        )}
        <div className={styles.title}>
          <span>Сортировать по: </span>
          <span className={styles.criterion} onClick={() => setIsVisible(!isVisible)}>
            {signs[activeIndex]}
          </span>
        </div>
      </div>
      {isVisible && (
        <div className={styles.popup}>
          <ul className={styles.list}>
            {signs.map((s, i) => (
              <li
                key={s}
                className={
                  i === activeIndex
                    ? `${styles.list__item} ${styles.active}`
                    : `${styles.list__item}`
                }
                onClick={() => handleClick(i)}>
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
