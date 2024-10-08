import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../redux/store';
import { selectUserIsAuth } from '../../../redux/user/selectors';
import { fetchDeleteShawarma } from '../../../redux/basket/asyncAction';
import { removeItem } from '../../../redux/basket/slice';
import { FaRegTrashCan } from 'react-icons/fa6';
import Counter from '../../../ui-kit/Counter';
import { formatPrice } from '../../../utils/formatPrice';
import styles from './BasketItem.module.scss';

type AddedComponentType = {
  id: number;
  name: string;
  count: number;
  price: number;
};

type BasketItemPropsType = {
  id: number;
  image: string;
  title: string;
  weight: number;
  cake: string;
  price: string;
  count: number;
  addedComponentsList: AddedComponentType[];
  removedComponentsList: string[];
};

const BasketItem: React.FC<BasketItemPropsType> = ({
  id,
  image,
  title,
  weight,
  cake,
  price,
  count,
  addedComponentsList,
  removedComponentsList,
}) => {
  const dispatch = useAppDispatch();
  const isAuth = useSelector(selectUserIsAuth);
  const uniqueId: string =
    id +
    cake +
    weight +
    JSON.stringify(addedComponentsList) +
    JSON.stringify(removedComponentsList);
  const totalPrice: string = formatPrice(parseFloat(price.replace(',', '.')) * count);

  const onClickRemove = (uniqueId: string) => {
    if (isAuth) {
      dispatch(fetchDeleteShawarma(id));
    } else {
      dispatch(removeItem(uniqueId));
    }
  };

  return (
    <>
      <li className={styles.list__item}>
        <div className={styles.wrapper}>
          <div className={styles.image}>
            <img src={process.env.REACT_APP_IMG_URL + image} alt={title} />
          </div>
          <div className={styles.content}>
            <h3>{title}</h3>
            <div className={styles.info}>
              <span>{weight} г.</span>
              <span>{cake}</span>
            </div>
            {addedComponentsList.length !== 0 && (
              <ul className={styles.added__list}>
                <b>Добавлено: </b>&nbsp;
                {addedComponentsList.map((component) => (
                  <li key={component.id} className={styles.added__item}>
                    {component.name}({component.count})
                  </li>
                ))}
              </ul>
            )}
            {removedComponentsList.length !== 0 && (
              <ul className={styles.removed__list}>
                <b>Удалено: </b>&nbsp;
                {removedComponentsList.map((component) => (
                  <li key={component} className={styles.removed__item}>
                    -{component}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className={styles.wrapper}>
          <Counter maxCount={10} initialValue={count} uniqueId={uniqueId} basketItemId={id} />
          <div className={styles.sum}>{totalPrice} р.</div>
          <FaRegTrashCan onClick={() => onClickRemove(uniqueId)} className={styles.trash} />
        </div>
      </li>
      <hr />
    </>
  );
};

export default BasketItem;
