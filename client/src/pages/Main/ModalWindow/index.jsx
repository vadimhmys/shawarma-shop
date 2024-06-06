import React from 'react';

import styles from './ModalWindow.module.scss';
import Switcher from '../../../components/Switcher';

export default function ModalWindow({ hideModalWindow, activeShawarma }) {
  const shawarma = structuredClone(activeShawarma);

  const [itemsForWeight, setItemsForWeight] = React.useState([true, ...Array(shawarma.props.length - 1).fill(false)]);

  const handleSwitchForWeight = (e) => {
    const newItems = shawarma.props.map((prop) => nameForWeightSwitcher + prop.id === e.target.id);
    setItemsForWeight(newItems);
  };

  const nameForWeightSwitcher = 'weightForModalWindow';

  console.log('active shawa: ', shawarma);

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
            <p>Выберите вес</p>
            <Switcher
              switcherName={nameForWeightSwitcher}
              properties={shawarma.props}
              items={itemsForWeight}
              onSwitch={handleSwitchForWeight}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
