import React from 'react';
import Switcher from '../../ui-kit/Switcher';
import Price from '../Price';
import Novelty from '../Novelty';
import VariantList from '../Variants/VariantList';
import Button from '../../ui-kit/Button';
import ModalWindow from '../ModalWindow';
import { ShawarmaType } from '../../redux/shawarmas/types';
import styles from './Card.module.scss';

type CardPropsType = {
  shawarma: ShawarmaType;
};

const Card: React.FC<CardPropsType> = ({ shawarma }) => {
  const [activeCardRadioBoxIndex, setActiveCardRadioBoxIndex] = React.useState(0);
  const [isModalWindowVisible, setIsModalWindowVisible] = React.useState(false);

  const hideModalWindow = () => {
    setIsModalWindowVisible(false);
  };

  const showModalWindow = () => {
    setIsModalWindowVisible(true);
  };

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <img
          className={styles.image}
          src={process.env.REACT_APP_IMG_URL + shawarma.image}
          alt={shawarma.title}
        />
        {shawarma.novelty && <Novelty />}
        <div className={styles.info}>
          <div className={styles.header}>
            <div className={styles.header__text}>{shawarma.title}</div>
            <img
              className={styles.header__icon}
              src={process.env.REACT_APP_IMG_URL + shawarma.icon}
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
        activeIndex={activeCardRadioBoxIndex}
      />
      <div className={styles.bottom}>
        <div className={styles.price}>
          <Price
            price={+shawarma.props[activeCardRadioBoxIndex].price}
            currency="руб."
            isBottom={true}
          />
        </div>
        <Button handleClick={showModalWindow}>В корзину</Button>
      </div>
      {isModalWindowVisible && (
        <ModalWindow
          activeShawarma={shawarma}
          hideModalWindow={hideModalWindow}
          initialRadioBoxIndex={activeCardRadioBoxIndex}
        />
      )}
    </div>
  );
};

export default Card;
