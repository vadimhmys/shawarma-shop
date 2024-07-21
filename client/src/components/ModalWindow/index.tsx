import React from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { UserType } from '../../redux/user/types';
import { selectUserIsAuth } from '../../redux/user/selectors';
import { clearIngredients, clearRemovedComponents } from '../../redux/shawarma/slice';
import { ShawarmaType } from '../../redux/shawarmas/types';
import { selectShawarma } from '../../redux/shawarma/selectors';
import { BasketAddedComponentType } from '../../redux/basket/types';
import { addItem } from '../../redux/basket/slice';
import { formatPrice } from '../../utils/formatPrice';
import Switcher from '../Switcher';
import ComponentList from '../ComponentList';
import Button from '../Button';
import ComponentToRemove from '../ComponentToRemove';

import styles from './ModalWindow.module.scss';
import { authInstance } from '../../http';

type ModalWindowPropsType = {
  hideModalWindow: () => void;
  activeShawarma: ShawarmaType;
  initialRadioBoxIndex: number;
};

type CakeType = {
  id: number;
  value: string;
};

const ModalWindow: React.FC<ModalWindowPropsType> = ({
  hideModalWindow,
  activeShawarma,
  initialRadioBoxIndex,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addedIngredients, removedComponents } = useSelector(selectShawarma);
  const isAuth = useSelector(selectUserIsAuth);
  const [activeRadioBoxIndex, setActiveRadioBoxIndex] = React.useState(initialRadioBoxIndex);
  const [activeCakeIndex, setActiveCakeIndex] = React.useState(0);
  const shawarma: ShawarmaType = structuredClone(activeShawarma);
  const activeProp = shawarma.props[activeRadioBoxIndex];
  const totalPrice = formatPrice(
    activeProp.price +
      addedIngredients.reduce(
        (sum: number, ing: BasketAddedComponentType) => sum + ing.count * ing.price,
        0,
      ),
  );
  const urlForIngredients: string = 'http://localhost:7000/api/ingredients/getall';
  const urlForSauces: string = 'http://localhost:7000/api/sauces/getall';
  const titleForIngredients: string = 'Выберите ингредиенты';
  const titleForSauces: string = 'Выберите соусы';
  const cakes: CakeType[] = [
    { id: 0, value: 'Обычная лепешка' },
    { id: 1, value: 'Сырная лепешка' },
  ];

  const changeActiveRadioBoxIndex = (index: number) => {
    setActiveRadioBoxIndex(index);
  };

  const changeCake = (index: number) => {
    setActiveCakeIndex(index);
  };

  const onClickAddToState = () => {
    const { id, title, image } = shawarma;
    const item = {
      id,
      title,
      image,
      weight: activeProp.weight,
      price: totalPrice,
      cake: cakes[activeCakeIndex].value,
      addedComponentsList: [...addedIngredients],
      removedComponentsList: [...removedComponents],
      count: 1,
    };
    dispatch(addItem(item));
    dispatch(clearIngredients());
    dispatch(clearRemovedComponents());
  };

  const sendToBasket = async (item: any) => {
    try {
      await authInstance.post('basketshawarmas/create', item);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const onClickAddToDB = () => {
    const { id, title, image } = shawarma;
    const cake = cakes[activeCakeIndex].value;
    const weight = activeProp.weight;
    const addedComponentsList = JSON.stringify([...addedIngredients]);
    const removedComponentsList = JSON.stringify([...removedComponents]);
    const uniqueShawaKey = id + cake + weight + addedComponentsList + removedComponentsList;
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signup');
    } else {
      const decodedToken = jwtDecode(token) as UserType;
      const userId = decodedToken.id;
      const item = {
        uniqueShawaKey,
        shawarmaId: id,
        title,
        image,
        weight,
        price: totalPrice,
        cake,
        addedComponentsList,
        removedComponentsList,
        count: 1,
        userId,
      };
      sendToBasket(item);
    }
  };

  const onClickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAuth) {
      onClickAddToDB();
    } else {
      onClickAddToState();
    }
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
            <span>{shawarma.props[activeRadioBoxIndex].weight} г.</span>
            {', '}
            <span>{cakes[activeCakeIndex].value}</span>
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
            <p className={styles.subtitle}>Убрать ингредиенты</p>
            <hr className={styles.line} />
            <ul>
              {shawarma.components
                .filter((component) => !component.necessity)
                .map((item) => (
                  <ComponentToRemove key={item.id}>{item.name}</ComponentToRemove>
                ))}
            </ul>
            <div className={styles.footer}>
              <Button
                handleClick={onClickAdd}>
                Добавить в корзину за {totalPrice} руб.
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;
