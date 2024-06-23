import React from 'react';
import { CiSearch } from 'react-icons/ci';
import { IoCloseOutline } from 'react-icons/io5';

import styles from './Search.module.scss';

export default function Search() {
  return (
    <div className={styles.root}>
      <CiSearch className={styles.search__icon} />
      <input className={styles.input} placeholder="Поиск пиццы..." />
      <IoCloseOutline className={styles.close__icon} />
    </div>
  );
}
