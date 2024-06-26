import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId } from '../../redux/slices/filterSlice.js';

import Card from '../../components/Card';
import Categories from '../../components/Categories';
import Sorting from '../../components/Sorting';
import CardLoader from '../../components/Card/CardLoader.jsx';
import ModalWindow from './ModalWindow';
import Pagination from '../../components/Pagination';
import { SearchContext } from '../../App.js';

import styles from './Main.module.scss';

export default function Main() {
  const dispatch = useDispatch();
  const { categoryId, sort } = useSelector((state) => state.filter);
  const sortType = sort.sortCritery;
  const { searchValue } = React.useContext(SearchContext);
  const [shawarmas, setShawarmas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isModalWindowVisible, setIsModalWindowVisible] = React.useState(false);
  const [activeShawarmaIndex, setActiveShawarmaIndex] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [numberOfItems, setNumberOfItems] = React.useState(0);

  const limit = window.innerWidth > 769 ? 8 : 4;

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
    setCurrentPage(1);
  };

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `http://localhost:7000/api/shawarmas/getall?${
        categoryId > 0 ? `categoryId=${categoryId}` : ''
      }&sortBy=${sortType.replace('-', '')}&order=${
        sortType.includes('-') ? 'DESC' : 'ASC'
      }&search=${searchValue}&limit=${limit}&page=${currentPage}`,
    )
      .then((res) => res.json())
      .then((obj) => {
        setShawarmas(obj.rows);
        setNumberOfItems(obj.count);
      })
      .finally(() => setIsLoading(false));
  }, [categoryId, sortType, searchValue, currentPage, limit]);

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
      <Pagination
        numberOfItems={numberOfItems}
        limit={limit}
        onPageChange={(number) => setCurrentPage(number)}
        currentPage={currentPage}
      />
    </div>
  );
}
