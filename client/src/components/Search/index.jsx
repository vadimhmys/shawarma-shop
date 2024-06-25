import React from 'react';
import { CiSearch } from 'react-icons/ci';
import { IoCloseOutline } from 'react-icons/io5';

import styles from './Search.module.scss';

export default function Search({ searchValue, onChangeSearchValue }) {
  return (
    <div className={styles.root}>
      <CiSearch className={styles.search__icon} />
      <input
        className={styles.input}
        value={searchValue}
        placeholder="Поиск шаурмы..."
        onChange={(e) => onChangeSearchValue(e.target.value)}
      />
      {searchValue && <IoCloseOutline className={styles.close__icon} onClick={() => onChangeSearchValue('')} />}
    </div>
  );
}
