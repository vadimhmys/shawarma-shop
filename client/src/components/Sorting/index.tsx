import React from 'react';
import { useDispatch } from 'react-redux';
import { SortCriteryEnum, SortType } from '../../redux/filter/types';
import { setSort } from '../../redux/filter/slice';
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from 'react-icons/md';

import styles from './Sorting.module.scss';

type PopupClickType = MouseEvent & {
  composedPath: () => Node[];
};

type SortingPropsType = {
  sortTitle: string;
};

export const sortingTypes: SortType[] = [
  { value: 'цене ↑', sortCritery: SortCriteryEnum.PRICE_DESC },
  { value: 'цене ↓', sortCritery: SortCriteryEnum.PRICE_ASC },
  { value: 'алфавиту↑', sortCritery: SortCriteryEnum.TITLE_DESC },
  { value: 'алфавиту↓', sortCritery: SortCriteryEnum.TITLE_ASC },
];

const Sorting: React.FC<SortingPropsType> = React.memo(({ sortTitle }) => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = React.useState(false);
  const sortRef = React.useRef<HTMLDivElement>(null);

  const handleClick = (obj: SortType) => {
    dispatch(setSort(obj));
    setIsVisible(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const _e = e as PopupClickType;
      if (sortRef.current && !_e.composedPath().includes(sortRef.current)) {
        setIsVisible(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div ref={sortRef} className={styles.container}>
      <div className={styles.top}>
        {isVisible ? (
          <MdOutlineArrowDropDown size="30" style={{ color: '#323232' }} />
        ) : (
          <MdOutlineArrowDropUp size="30" style={{ color: '#323232' }} />
        )}
        <div className={styles.title}>
          <span>Сортировать по: </span>
          <span className={styles.criterion} onClick={() => setIsVisible(!isVisible)}>
            {sortTitle}
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
                  obj.value === sortTitle
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
});

export default Sorting;
