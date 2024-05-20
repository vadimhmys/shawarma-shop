import React, { useEffect, useState } from 'react';
import Card from '../components/Card.jsx';

export default function Main() {
  const [shawarmas, setShawarmas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:7000/api/shawarma/getall')
      .then((res) => res.json())
      .then((arr) => setShawarmas(arr));
  }, []);

  return (
    <>
      <h2 className="content__title">Все шавухи</h2>
      <div className="content__items">
        {shawarmas.map((s) => (
          <Card key={s.id} shawarma={s} />
        ))}
      </div>
    </>
  );
}
