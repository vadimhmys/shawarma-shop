import React, { useEffect, useState } from 'react';
import Card from '../components/Card.jsx';
import Categories from '../components/Categories.jsx';
import Sorting from '../components/Sorting.jsx';

export default function Main() {
  const [shawarmas, setShawarmas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:7000/api/shawarmas/getall')
      .then((res) => res.json())
      .then((arr) => setShawarmas(arr));
  }, []);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sorting />
      </div>
      <h2 className="content__title">Все шавухи</h2>
      <div className="content__items">
        {shawarmas.map((s) => (
          s.presence && <Card key={s.id} shawarma={s} />
        ))}
      </div>
    </>
  );
}
