import React from 'react';
import { CiSearch } from 'react-icons/ci';
import { IoCloseOutline } from 'react-icons/io5';
import { SearchContext } from '../../App';

import styles from './Search.module.scss';

export default function Search() {
  const { searchValue, setSearchValue } = React.useContext(SearchContext);
  return (
    <div className={styles.root}>
      <CiSearch className={styles.search__icon} />
      <input
        className={styles.input}
        value={searchValue}
        placeholder="Поиск шаурмы..."
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {searchValue && (
        <IoCloseOutline className={styles.close__icon} onClick={() => setSearchValue('')} />
      )}
    </div>
  );
}
