import React from 'react';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/filter/slice';
import { CiSearch } from 'react-icons/ci';
import { IoCloseOutline } from 'react-icons/io5';
import { debounce } from '../../utils/debounce';

import styles from './Search.module.scss';

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [value, setValue] = React.useState('');

  const handleClearInput = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current?.focus();
  };

  const handleChangeSearchValue = React.useMemo(
    () => debounce((str: string) => dispatch(setSearchValue(str)), 500),
    [dispatch]
  );

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
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
};

export default Search;
