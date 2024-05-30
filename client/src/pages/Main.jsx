import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Categories from '../components/Categories.jsx';
import Sorting from '../components/Sorting.jsx';
import CardLoader from '../components/Card/CardLoader.jsx';

export default function Main() {
  const [shawarmas, setShawarmas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:7000/api/shawarmas/getall')
      .then((res) => res.json())
      .then((arr) => setShawarmas(arr))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sorting />
      </div>
      <h2 className="content__title">Все шавухи</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, i) => <CardLoader key={i} />)
          : shawarmas.map((s) => s.presence && <Card key={s.id} shawarma={s} />)}
      </div>
    </>
  );
}
