import React from 'react';
import WeightSwitcher from './WeightSwitcher';

export default function Card({ shawarma }) {
  return (
    <div className="card">
      <div className="card__top">
        <img src="./images/chiken.webp" alt="chiken" />
        <div className="card__top-info">
          <div className="title">
            <div className="title__text">Чикен</div>
            <img className="title__icon" src="./images/chicken-icon.svg" alt="chiken icon" />
          </div>
          <div className="availability">
            <div className="availability__item">
              <div className="weight">300 г.</div>
              <div className="price">
                <span className="rubles">5</span>
                <sup className="kopecks">90</sup>
                <sub className="currency">р.</sub>
              </div>
            </div>
            <div className="availability__item">
              <div className="weight">400 г.</div>
              <div className="price">
                <span className="rubles">7</span>
                <sup className="kopecks">90</sup>
                <sub className="currency">р.</sub>
              </div>
            </div>
            <div className="availability__item">
              <div className="weight">500 г.</div>
              <div className="price">
                <span className="rubles">10</span>
                <sup className="kopecks">90</sup>
                <sub className="currency">р.</sub>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h3 className="card__title">Курица Стандарт</h3>
      <p className="card__description">
        Лепешка, Курица, Капуста, Помидор, Маринованный огурец, Чесночный соус, Красный соус
      </p>
      <WeightSwitcher variants={shawarma.variants} />
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