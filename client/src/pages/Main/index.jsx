import React from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilterParams } from '../../redux/slices/filterSlice.js';

import Card from '../../components/Card';
import Categories from '../../components/Categories';
import Sorting, { sortingTypes } from '../../components/Sorting';
import CardLoader from '../../components/Card/CardLoader.jsx';
import ModalWindow from './ModalWindow';
import Pagination from '../../components/Pagination';
import { SearchContext } from '../../App.js';

import styles from './Main.module.scss';

export default function Main() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
  const { searchValue } = React.useContext(SearchContext);
  const [shawarmas, setShawarmas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isModalWindowVisible, setIsModalWindowVisible] = React.useState(false);
  const [activeShawarmaIndex, setActiveShawarmaIndex] = React.useState(0);
  const [numberOfItems, setNumberOfItems] = React.useState(0);

  const limit = window.innerWidth > 769 ? 8 : 4;
  const pageCount = Math.ceil(numberOfItems / limit);

  const showModalWindow = (id) => {
    setIsModalWindowVisible(true);
    const nextActiveShawarmaIndex = shawarmas.findIndex((shawarma) => shawarma.id === id);
    setActiveShawarmaIndex(nextActiveShawarmaIndex);
  };

  const hideModalWindow = () => {
    setIsModalWindowVisible(false);
  };

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
    dispatch(setCurrentPage(1));
  };

  const onPageChange = (number) => {
    dispatch(setCurrentPage(number));
  };

  const fetchShawarmas = React.useCallback(() => {
    const sortBy = sort.sortCritery.replace('-', '');
    const order = sort.sortCritery.includes('-') ? 'DESC' : 'ASC';

    setIsLoading(true);
    axios
      .get(
        `http://localhost:7000/api/shawarmas/getall?categoryId=${categoryId}&sortBy=${sortBy}&order=${order}&searchValue=${searchValue}&limit=${limit}&currentPage=${currentPage}`,
      )
      .then((res) => {
        setShawarmas(res.data.rows);
        setNumberOfItems(res.data.count);
      })
      .finally(() => setIsLoading(false));
  }, [categoryId, sort.sortCritery, searchValue, currentPage, limit]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortingTypes.find(obj => obj.sortCritery === params.sortBy);
      dispatch(
        setFilterParams({
          ...params,
          sort
        })
      );
    }
    
  }, [dispatch]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    fetchShawarmas();
  }, [categoryId, sort.sortCritery, searchValue, currentPage, limit, fetchShawarmas]);

  React.useEffect(() => {
    const queryString = qs.stringify({
      categoryId,
      sortBy: sort.sortCritery,
      currentPage,
    });
    navigate(`?${queryString}`);
  }, [categoryId, sort.sortCritery, currentPage, navigate]);

  const skeletons = [...new Array(6)].map((_, i) => <CardLoader key={i} />);
  const items = shawarmas.map(
    (s) => s.presence && <Card key={s.id} shawarma={s} showModalWindow={showModalWindow} />,
  );

  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sorting />
      </div>
      <h2 className={styles.title}>Все шавухи</h2>
      <div className={styles.items}>{isLoading ? skeletons : items}</div>
      {isModalWindowVisible && (
        <ModalWindow
          activeShawarma={shawarmas[activeShawarmaIndex]}
          hideModalWindow={hideModalWindow}
        />
      )}
      <Pagination pageCount={pageCount} onPageChange={onPageChange} currentPage={currentPage} />
    </div>
  );
}
