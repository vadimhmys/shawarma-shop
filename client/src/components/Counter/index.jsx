import React from 'react';
import { useDispatch } from 'react-redux';
import { addIngredient, removeIngredient } from '../../redux/slices/shawarmaSlice';
import { decrementItem, incrementItem } from '../../redux/slices/basketSlice';
import { formatPrice } from '../../utils/formatPrice';

import styles from './Counter.module.scss';

export default function Counter({
  maxCount,
  isSimple = true,
  initialValue = 0,
  component,
  uniqueId,
}) {
  const dispatch = useDispatch();
  const [multiplier, setMultiplier] = React.useState(initialValue);

  const incrementCounter = (e) => {
    e.preventDefault();
    if (multiplier === maxCount) return;
    setMultiplier(multiplier + 1);
    if (!isSimple) {
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
        dispatch(incrementItem(uniqueId));
      }
    }
  };

  const decrementCounter = (e) => {
    e.preventDefault();
    if (multiplier === 0) return;
    setMultiplier(multiplier - 1);
    if (!isSimple) {
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
      dispatch(decrementItem(uniqueId));
    }
  };

  return (
    <div className={styles.root}>
      {!isSimple && (
        <p className={multiplier === 0 ? styles.sum : styles.sum + ' ' + styles.dedicated}>
          {multiplier === 0 ? 0 : formatPrice(multiplier * component.price)} р.
        </p>
      )}

      <div className={styles.counter}>
        <button className={styles.button} onClick={decrementCounter}>
          &#8722;
        </button>
        <div className={styles.quantity}>
          <span>{multiplier}</span>
          {!isSimple && <span>x</span>}
          {!isSimple && <span>{formatPrice(component.price)} р</span>}
        </div>
        <button className={styles.button} onClick={incrementCounter}>
          &#43;
        </button>
      </div>
    </div>
  );
}
