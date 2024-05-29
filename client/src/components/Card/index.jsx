import React, { useState } from 'react';
import WeightSwitcher from '../WeightSwitcher';
import Variant from '../Variant';
import Price from '../Price';
import Novelty from '../Novelty';

export default function Card({ shawarma }) {
  const [items, setItems] = useState([true, ...Array(shawarma.props.length - 1).fill(false)]);
  const handleSwitch = (e) => {
    const newItems = shawarma.props.map((prop) => prop.id === +e.target.id);
    setItems(newItems);
  };
  const activeIndex = items.findIndex((item) => item);

  return (
    <div className="card">
      <div className="card__top">
        <img src={`http://localhost:7000/${shawarma.image}`} alt={shawarma.title} />
        {shawarma.novelty && <Novelty />}
        <div className="card__top-info">
          <div className="title">
            <div className="title__text">{shawarma.title}</div>
            <img
              className="title__icon"
              src={`http://localhost:7000/${shawarma.icon}`}
              alt={shawarma.title}
            />
          </div>
          <div className="variants">
            {shawarma.props.map((p) => (
              <Variant key={p.id} weight={p.weight} price={p.price} />
            ))}
          </div>
        </div>
      </div>
      <h3 className="card__title">{shawarma.name}</h3>
      <p className="card__components">
        {shawarma.components.map((c) => (
          <span key={c.name}>{c.name}</span>
        ))}
      </p>
      <WeightSwitcher properties={shawarma.props} items={items} onSwitch={handleSwitch} />
      <div className="card__bottom">
        <div className="card__bottom-price">
          <Price price={shawarma.props[activeIndex].price} currency="руб." />
        </div>
        <button className="button">В корзину</button>
      </div>
    </div>
  );
}
