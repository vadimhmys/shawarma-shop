import React from 'react';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';
import { CiSearch } from 'react-icons/ci';
import { IoCloseOutline } from 'react-icons/io5';
import { debounce } from '../../utils/debounce';

import styles from './Search.module.scss';

export default function Search() {
  const dispatch = useDispatch();
  const inputRef = React.useRef(null);
  const [value, setValue] = React.useState('');

  const handleClearInput = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current.focus();
  };

  const handleChangeSearchValue = React.useRef(
    debounce((str) => dispatch(setSearchValue(str)), 500),
  ).current;

  const handleChangeInput = (e) => {
    handleChangeSearchValue(e.target.value);
    setValue(e.target.value);
  };

  return (
    <div className={styles.root}>
      <CiSearch className={styles.search__icon} />
      <input
        ref={inputRef}
        className={styles.input}
        value={value}
        placeholder="Поиск шаурмы..."
        onChange={handleChangeInput}
      />
      {value && <IoCloseOutline className={styles.close__icon} onClick={handleClearInput} />}
    </div>
  );
}
