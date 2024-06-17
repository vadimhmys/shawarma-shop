import React from 'react';

import styles from './Counter.module.scss';

export default function Counter({ price, maxCount, isSimple = true, initialValue = 0 }) {
  const [multiplier, setMultiplier] = React.useState(initialValue);

  const incrementCounter = (e) => {
    e.preventDefault();
    if (multiplier === maxCount) return;
    setMultiplier(multiplier + 1);
  };

  const decrementCounter = (e) => {
    e.preventDefault();
    if (multiplier === 0) return;
    setMultiplier(multiplier - 1);
  };

  let formatter = new Intl.NumberFormat('ru', {
    minimumFractionDigits: 2,
  });

  return (
    <div className={styles.root}>
      {!isSimple && (
        <p className={multiplier === 0 ? styles.sum : styles.sum + ' ' + styles.dedicated}>
          {multiplier === 0 ? 0 : formatter.format(multiplier * price)} р.
        </p>
      )}

      <div className={styles.counter}>
        <button className={styles.button} onClick={decrementCounter}>
          &#8722;
        </button>
        <div className={styles.quantity}>
          <span>{multiplier}</span>
          {!isSimple && <span>x</span>}
          {!isSimple && <span>{formatter.format(price)} р</span>}
        </div>
        <button className={styles.button} onClick={incrementCounter}>
          &#43;
        </button>
      </div>
    </div>
  );
}
