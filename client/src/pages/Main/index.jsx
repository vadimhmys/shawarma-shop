import React from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilterParams } from '../../redux/slices/filterSlice.js';
import { fetchShawarmas } from '../../redux/slices/shawarmasSlice.js';

import Card from '../../components/Card';
import Categories from '../../components/Categories';
import Sorting, { sortingTypes } from '../../components/Sorting';
import CardLoader from '../../components/Card/CardLoader.jsx';
import Pagination from '../../components/Pagination';
import { SearchContext } from '../../App.js';

import styles from './Main.module.scss';

export default function Main() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
  const { shawarmas, count, status } = useSelector((state) => state.shawarmas);
  const { searchValue } = React.useContext(SearchContext);
  const isMounted = React.useRef(false);

  const sortBy = sort.sortCritery.replace('-', '');
  const order = sort.sortCritery.includes('-') ? 'DESC' : 'ASC';
  const limit = window.innerWidth > 769 ? 8 : 4;
  const pageCount = Math.ceil(count / limit);

  const onChangeCategory = React.useCallback(
    (id) => {
      dispatch(setCategoryId(id));
      dispatch(setCurrentPage(1));
    },
    [dispatch],
  );

  const onPageChange = (number) => {
    dispatch(setCurrentPage(number));
  };

  const getShawarmas = React.useCallback(async () => {
    dispatch(
      fetchShawarmas({
        categoryId,
        sortBy,
        order,
        searchValue,
        limit,
        currentPage,
      }),
    );
  }, [categoryId, sortBy, order, searchValue, limit, currentPage, dispatch]);

  React.useEffect(() => {
    if (
      window.location.search &&
      window.location.search !== '?categoryId=0&sortBy=price&currentPage=1'
    ) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortingTypes.find((obj) => obj.sortCritery === params.sortBy);
      dispatch(
        setFilterParams({
          ...params,
          sort,
        }),
      );
    }
  }, [dispatch]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    getShawarmas();
  }, [categoryId, sort.sortCritery, searchValue, currentPage, limit, getShawarmas]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryId,
        sortBy: sort.sortCritery,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortCritery, currentPage, navigate]);

  const skeletons = [...new Array(6)].map((_, i) => <CardLoader key={i} />);
  const items = shawarmas.map((s) => s.presence && <Card key={s.id} shawarma={s} />);

  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sorting />
      </div>
      <h2 className={styles.title}>Шаурма</h2>
      {status === 'error' ? (
        <div className={styles.errorInfo}>
          <h2 className={styles.errorInfo__title}>Ошибка получения шавух</h2>
          <p className={styles.errorInfo__text}>К сожалению не удалось получить шавухи, повторите запрос позже</p>
        </div>
      ) : (
        <div className={styles.items}>{status === 'loading' ? skeletons : items}</div>
      )}
      <Pagination pageCount={pageCount} onPageChange={onPageChange} currentPage={currentPage} />
    </div>
  );
}
