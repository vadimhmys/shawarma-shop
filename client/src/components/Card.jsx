import React from 'react';
import WeightSwitcher from './WeightSwitcher';
import Variant from './Variant';

export default function Card({ shawarma }) {
  return (
    <div className="card">
      <div className="card__top">
        <img src={shawarma.image} alt={shawarma.title} />
        <div className="card__top-info">
          <div className="title">
            <div className="title__text">{shawarma.title}</div>
            <img className="title__icon" src="./images/chicken-icon.svg" alt="chiken icon" />
          </div>
          <div className="variants">
            {shawarma.props.map((p) => (
              <Variant key={p.id} weight={p.weight} />
            ))}
          </div>
        </div>
      </div>
      <h3 className="card__title">Курица Стандарт</h3>
      <p className="card__description">
        Лепешка, Курица, Капуста, Помидор, Маринованный огурец, Чесночный соус, Красный соус
      </p>
      <WeightSwitcher variants={shawarma.props} />
      <div className="card__bottom">
        <div className="card__bottom-price">
          <div className="price">
            <span className="rubles">1</span>
            <sup className="kopecks">90</sup>
          </div>
          <span className="currency">руб.</span>
        </div>
        <button className="button">В корзину</button>
      </div>
    </div>
  );
}
