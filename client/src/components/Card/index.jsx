import React from 'react';

import Switcher from '../Switcher';
import Price from '../Price';
import Novelty from '../Novelty';
import VariantList from '../Variants/VariantList';
import Button from '../Button';

import styles from './Card.module.scss';

export default function Card({ shawarma }) {
  const [items, setItems] = React.useState([true, ...Array(shawarma.props.length - 1).fill(false)]);
  const handleSwitch = (e) => {
    const newItems = shawarma.props.map((prop) => prop.id === +e.target.id);
    setItems(newItems);
  };
  const activeIndex = items.findIndex((item) => item);

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <img
          className={styles.image}
          src={`http://localhost:7000/${shawarma.image}`}
          alt={shawarma.title}
        />
        {shawarma.novelty && <Novelty />}
        <div className={styles.info}>
          <div className={styles.header}>
            <div className={styles.header__text}>{shawarma.title}</div>
            <img
              className={styles.header__icon}
              src={`http://localhost:7000/${shawarma.icon}`}
              alt={shawarma.title}
            />
          </div>
          <VariantList propertyList={shawarma.props} />
        </div>
      </div>
      <h3 className={styles.title}>{shawarma.name}</h3>
      <p className={styles.components}>
        {shawarma.components.map((c) => (
          <span key={c.name}>{c.name}</span>
        ))}
      </p>
      <Switcher
        switcherName="weight"
        properties={shawarma.props}
        items={items}
        onSwitch={handleSwitch}
      />
      <div className={styles.bottom}>
        <div className={styles.price}>
          <Price price={shawarma.props[activeIndex].price} currency="руб." isBottom={true} />
        </div>
        <Button>В корзину</Button>
      </div>
    </div>
  );
}
