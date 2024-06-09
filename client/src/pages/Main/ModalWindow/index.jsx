import React from 'react';

import Switcher from '../../../components/Switcher';
import ComponentList from './ComponentList';

import styles from './ModalWindow.module.scss';

export default function ModalWindow({ hideModalWindow, activeShawarma }) {
  const shawarma = structuredClone(activeShawarma);
  const urlForIngredients = 'http://localhost:7000/api/ingredients/getall';
  const urlForSauces = 'http://localhost:7000/api/sauces/getall';
  const titleForIngredients = 'Выберите ингредиенты';
  const titleForSauces = 'Выберите соусы';
  const cakes = [
    { id: 0, value: 'Обычная лепешка' },
    { id: 1, value: 'Сырная лепешка' },
  ];

  return (
    <div className={styles.background__showed}>
      <div className={styles.body}>
        <div className={styles.close} onClick={hideModalWindow}></div>
        <h2 className={styles.title}>{shawarma.name}</h2>
        <div className={styles.content}>
          <div className={styles.info}>
            <span>{shawarma.props[0].weight} г.</span>
            {', '}
            <span>Лепешка</span>
          </div>
          <div className={styles.components}>
            {shawarma.components.map((c) => (
              <span key={c.id}>{c.name}</span>
            ))}
          </div>
          <form method="post" className={styles.form}>
            <p className={styles.field}>Выберите вес</p>
            <Switcher
              radioBoxGroupName="weightsInModalWindow"
              dataForInputs={shawarma.props.map((prop) => ({
                id: prop.id,
                value: prop.weight + ' гр.',
              }))}
            />
            <p className={styles.field}>Выберите лепешку</p>
            <Switcher radioBoxGroupName="cakesInModalWindow" dataForInputs={cakes} />
            <ComponentList title={titleForIngredients} url={urlForIngredients} />
            <ComponentList title={titleForSauces} url={urlForSauces} />
          </form>
        </div>
      </div>
    </div>
  );
}
