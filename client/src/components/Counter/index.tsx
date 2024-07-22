import React from 'react';
import { useAppDispatch } from '../../redux/store';
import { addIngredient, removeIngredient } from '../../redux/shawarma/slice';
import { decrementItem, incrementItem } from '../../redux/basket/slice';
import { fetchDecrementShawarma, fetchIncrementShawarma } from '../../redux/basket/asyncAction';
import type { ComponentType } from '../ComponentList';
import { useSelector } from 'react-redux';
import { selectUserIsAuth } from '../../redux/user/selectors';
import { formatPrice } from '../../utils/formatPrice';

import styles from './Counter.module.scss';

type CounterPropsType = {
  maxCount: number;
  isSimple?: boolean;
  component?: ComponentType;
  initialValue?: number;
  uniqueId?: string;
  basketItemId?: number;
};

const Counter: React.FC<CounterPropsType> = ({
  maxCount,
  isSimple = true,
  initialValue = 0,
  component,
  uniqueId,
  basketItemId,
}) => {
  const dispatch = useAppDispatch();
  const isAuth = useSelector(selectUserIsAuth);
  const [multiplier, setMultiplier] = React.useState<number>(initialValue);

  const incrementCounter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (multiplier === maxCount) return;
    setMultiplier(multiplier + 1);
    if (!isSimple && component) {
      dispatch(
        addIngredient({
          id: component.id,
          name: component.name,
          count: multiplier + 1,
          price: component.price,
        }),
      );
    } else {
      if (multiplier <= 10) {
        if (isAuth && basketItemId) {
          dispatch(fetchIncrementShawarma(basketItemId));
        } else {
          dispatch(incrementItem(uniqueId));
        }
      }
    }
  };

  const decrementCounter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (multiplier === 0) return;
    setMultiplier(multiplier - 1);
    if (!isSimple && component) {
      dispatch(
        removeIngredient({
          id: component.id,
          name: component.name,
          count: multiplier - 1,
        }),
      );
    } else {
      if (multiplier < 2) {
        setMultiplier(1);
        return;
      }
      if (isAuth && basketItemId) {
        dispatch(fetchDecrementShawarma(basketItemId));
      } else {
        dispatch(decrementItem(uniqueId));
      }
    }
  };

  return (
    <div className={styles.root}>
      {!isSimple && component && (
        <p className={multiplier === 0 ? styles.sum : styles.sum + ' ' + styles.dedicated}>
          {multiplier === 0 ? 0 : formatPrice(multiplier * component.price)} р.
        </p>
      )}

      <div className={styles.counter}>
        <button
          className={styles.button}
          onClick={decrementCounter}
          disabled={(isSimple && multiplier === 1) || (!isSimple && multiplier === 0) }>
          &#8722;
        </button>
        <div className={styles.quantity}>
          <span>{multiplier}</span>
          {!isSimple && <span>x</span>}
          {!isSimple && component && <span>{formatPrice(component.price)} р</span>}
        </div>
        <button
          className={styles.button}
          onClick={incrementCounter}
          disabled={multiplier === maxCount}>
          &#43;
        </button>
      </div>
    </div>
  );
};

export default Counter;
