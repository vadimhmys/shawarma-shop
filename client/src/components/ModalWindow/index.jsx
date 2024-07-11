import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../redux/slices/basketSlice';
import { clearIngredients } from '../../redux/slices/shawarmaSlice';
import { formatPrice } from '../../utils/formatPrice';
import Switcher from '../Switcher';
import ComponentList from '../ComponentList';
import Button from '../Button';

import styles from './ModalWindow.module.scss';

export default function ModalWindow({ hideModalWindow, activeShawarma, initialRadioBoxIndex }) {
  const dispatch = useDispatch();
  const { addedIngredients } = useSelector((state) => state.shawarma);
  const [activeRadioBoxIndex, setActiveRadioBoxIndex] = React.useState(initialRadioBoxIndex);
  const [activeCakeIndex, setActiveCakeIndex] = React.useState(0);

  const shawarma = structuredClone(activeShawarma);
  const activeProp = shawarma.props[activeRadioBoxIndex];
  
  const totalPrice = formatPrice(activeProp.price + addedIngredients.reduce((sum, ing) => sum + ing.count * ing.price, 0));
  const urlForIngredients = 'http://localhost:7000/api/ingredients/getall';
  const urlForSauces = 'http://localhost:7000/api/sauces/getall';
  const titleForIngredients = 'Выберите ингредиенты';
  const titleForSauces = 'Выберите соусы';
  const cakes = [
    { id: 0, value: 'Обычная лепешка' },
    { id: 1, value: 'Сырная лепешка' },
  ];

  const changeActiveRadioBoxIndex = (index) => {
    setActiveRadioBoxIndex(index);
  };

  const changeCake = (index) => {
    setActiveCakeIndex(index);
  };

  const onClickAdd = (e) => {
    e.preventDefault();
    const { id, title, image } = shawarma;
    const item = {
      id,
      title,
      image,
      weight: activeProp.weight,
      price: totalPrice,
      cake: cakes[activeCakeIndex].value,
      addedComponentsList: [...addedIngredients],
      count: 1
    };
    dispatch(addItem(item));
    dispatch(clearIngredients());
    hideModalWindow();
  };

  const onClickClose = () => {
    dispatch(clearIngredients());
    hideModalWindow();
  };

  React.useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'visible';
    };
  });

  return (
    <div className={styles.background__showed}>
      <div className={styles.body}>
        <div className={styles.close} onClick={onClickClose}></div>
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
              onParentStateChange={changeActiveRadioBoxIndex}
              activeIndex={activeRadioBoxIndex}
            />
            <p className={styles.field}>Выберите лепешку</p>
            <Switcher
              radioBoxGroupName="cakesInModalWindow"
              dataForInputs={cakes}
              onParentStateChange={changeCake}
              activeIndex={activeCakeIndex}
            />
            <ComponentList title={titleForIngredients} url={urlForIngredients} />
            <ComponentList title={titleForSauces} url={urlForSauces} />
            <div className={styles.footer}>
              <Button handleClick={onClickAdd}>
                Добавить в корзину за {totalPrice} руб.
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
