import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../../redux/slices/basketSlice';

import Switcher from '../../../components/Switcher';
import ComponentList from './ComponentList';
import Button from '../../../components/Button';

import styles from './ModalWindow.module.scss';
import { clearIngredients } from '../../../redux/slices/ingredientSlice';

export default function ModalWindow({ hideModalWindow, activeShawarma, activeWeightPriceCoupleIndex }) {
  const dispatch = useDispatch();
  const {addedIngredients} = useSelector(state => state.ingredient);
  const shawarma = structuredClone(activeShawarma);
  const [activeCakeIndex, setActiveCakeIndex] = React.useState(0);
  const [activeProp, setActiveProp] = React.useState(shawarma.props[0]);
  let formatter = new Intl.NumberFormat('ru', {
    minimumFractionDigits: 2,
  });
  const urlForIngredients = 'http://localhost:7000/api/ingredients/getall';
  const urlForSauces = 'http://localhost:7000/api/sauces/getall';
  const titleForIngredients = 'Выберите ингредиенты';
  const titleForSauces = 'Выберите соусы';
  const cakes = [
    { id: 0, value: 'Обычная лепешка' },
    { id: 1, value: 'Сырная лепешка' },
  ];
  
  const changeWeightPriceCouple = (index) => {
    setActiveProp(shawarma.props[index]);
  };

  const changeCake = (index) => {
    setActiveCakeIndex(index);
  };

  React.useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'visible';
    };
  });

  const onClickAdd = (e) => {
    e.preventDefault();
    const {id, title, image} = shawarma;
    const item = {
      id,
      title,
      image,
      weight: activeProp.weight,
      price: activeProp.price,
      cake: cakes[activeCakeIndex].value,
      addedComponentsList: [...addedIngredients],
    };
    dispatch(addItem(item));
    dispatch(clearIngredients())
  }

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
              onParentStateChange={changeWeightPriceCouple}
              activeWeightPriceCoupleIndex={activeWeightPriceCoupleIndex}
            />
            <p className={styles.field}>Выберите лепешку</p>
            <Switcher radioBoxGroupName="cakesInModalWindow" dataForInputs={cakes} onParentStateChange={changeCake}/>
            <ComponentList title={titleForIngredients} url={urlForIngredients} />
            <ComponentList title={titleForSauces} url={urlForSauces} />
            <div className={styles.footer}>
              <Button handleClick={onClickAdd}>Добавить в корзину за {formatter.format(activeProp.price)} руб.</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
