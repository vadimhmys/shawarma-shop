import React from 'react';

import Card from '../../components/Card';
import Categories from '../../components/Categories';
import Sorting from '../../components/Sorting';
import CardLoader from '../../components/Card/CardLoader.jsx';
import ModalWindow from './ModalWindow';
import Pagination from '../../components/Pagination';

import styles from './Main.module.scss';

export default function Main({ searchValue }) {
  const [shawarmas, setShawarmas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isModalWindowVisible, setIsModalWindowVisible] = React.useState(false);
  const [activeShawarmaIndex, setActiveShawarmaIndex] = React.useState(0);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    value: 'цене ↑',
    sortCritery: 'price',
  });
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
    setCategoryId(id);
    setCurrentPage(1);
  };

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `http://localhost:7000/api/shawarmas/getall?${
        categoryId > 0 ? `categoryId=${categoryId}` : ''
      }&sortBy=${sortType.sortCritery.replace('-', '')}&order=${
        sortType.sortCritery.includes('-') ? 'DESC' : 'ASC'
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
        <Sorting sortType={sortType} onChangeSort={(obj) => setSortType(obj)} />
      </div>
      <h2 className={styles.title}>Все шавухи</h2>
      <div className={styles.items}>{isLoading ? skeletons : items}</div>
      {isModalWindowVisible && (
        <ModalWindow
          activeShawarma={shawarmas[activeShawarmaIndex]}
          hideModalWindow={hideModalWindow}
        />
      )}
      <Pagination numberOfItems={numberOfItems} limit={limit} onPageChange={(number) => setCurrentPage(number)} currentPage={currentPage}/>
    </div>
  );
}
