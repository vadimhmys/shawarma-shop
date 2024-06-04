import React from 'react';

import Card from '../../components/Card';
import Categories from '../../components/Categories';
import Sorting from '../../components/Sorting';
import CardLoader from '../../components/Card/CardLoader.jsx';

import styles from './Main.module.scss';

export default function Main() {
  const [shawarmas, setShawarmas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const url = 'http://localhost:7000/api/shawarmas/getall';

  React.useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((arr) => setShawarmas(arr))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className={styles.top}>
        <Categories />
        <Sorting />
      </div>
      <h2 className={styles.title}>Все шавухи</h2>
      <div className={styles.items}>
        {isLoading
          ? [...new Array(6)].map((_, i) => <CardLoader key={i} />)
          : shawarmas.map((s) => s.presence && <Card key={s.id} shawarma={s} />)}
      </div>
    </>
  );
}
