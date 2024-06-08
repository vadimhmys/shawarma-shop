import React from 'react';

import Switcher from '../Switcher';
import Price from '../Price';
import Novelty from '../Novelty';
import VariantList from '../Variants/VariantList';
import Button from '../Button';

import styles from './Card.module.scss';

export default function Card({ shawarma, showModalWindow }) {
  const [activeCardRadioBoxIndex, setActiveCardRadioBoxIndex] = React.useState(0);

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
        radioBoxGroupName={'weightsInCard_' + shawarma.id}
        dataForInputs={shawarma.props.map((prop) => ({ id: prop.id, value: prop.weight + ' гр.' }))}
        onParentStateChange={setActiveCardRadioBoxIndex}
      />
      <div className={styles.bottom}>
        <div className={styles.price}>
          <Price
            price={shawarma.props[activeCardRadioBoxIndex].price}
            currency="руб."
            isBottom={true}
          />
        </div>
        <Button handleClick={() => showModalWindow(shawarma.id)}>В корзину</Button>
      </div>
    </div>
  );
}
