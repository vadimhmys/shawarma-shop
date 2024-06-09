import React from 'react';

import Switcher from '../../../components/Switcher';
import Counter from '../../../components/Counter';

import styles from './ModalWindow.module.scss';


export default function ModalWindow({ hideModalWindow, activeShawarma }) {
  const shawarma = structuredClone(activeShawarma);
  const urlForIngredients = 'http://localhost:7000/api/ingredients/getall';

  const [ingredients, setIngredients] = React.useState([]);

  console.log('ingredients: ', ingredients);

  React.useEffect(() => {
    fetch(urlForIngredients)
      .then((res) => res.json())
      .then((arr) => setIngredients(arr));
  }, []);

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
            <p className={styles.field}>Выберите ингредиенты</p>
            <hr />
            <ul className={styles.ingredient__list}>
              {ingredients.map((ingredient) => (
                <li key={ingredient.id} className={styles.ingredient__list__item}>
                  <div className={styles.ingredient__content}>
                    <img src={`http://localhost:7000/${ingredient.image}`} alt={ingredient.name} />
                    <span>{ingredient.name}</span>
                  </div>
                  <Counter price={ingredient.price} maxCount={4}/>
                </li>
              ))}
            </ul>
          </form>
        </div>
      </div>
    </div>
  );
}
