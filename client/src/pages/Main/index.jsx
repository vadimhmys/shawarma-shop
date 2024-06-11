import React from 'react';

import Card from '../../components/Card';
import Categories from '../../components/Categories';
import Sorting from '../../components/Sorting';
import CardLoader from '../../components/Card/CardLoader.jsx';
import ModalWindow from './ModalWindow/index.jsx';

import styles from './Main.module.scss';

export default function Main() {
  const [shawarmas, setShawarmas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isModalWindowVisible, setIsModalWindowVisible] = React.useState(false);
  const [activeShawarmaIndex, setActiveShawarmaIndex] = React.useState(0);

  const url = 'http://localhost:7000/api/shawarmas/getall';

  const showModalWindow = (id) => {
    setIsModalWindowVisible(true);
    const nextActiveShawarmaIndex = shawarmas.findIndex((shawarma) => shawarma.id === id);
    setActiveShawarmaIndex(nextActiveShawarmaIndex);
  };

  const hideModalWindow = () => {
    setIsModalWindowVisible(false);
  };

  React.useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((arr) => setShawarmas(arr))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <Categories />
        <Sorting />
      </div>
      <h2 className={styles.title}>Все шавухи</h2>
      <div className={styles.items}>
        {isLoading
          ? [...new Array(6)].map((_, i) => <CardLoader key={i} />)
          : shawarmas.map(
              (s) =>
                s.presence && <Card key={s.id} shawarma={s} showModalWindow={showModalWindow} />,
            )}
      </div>
      {isModalWindowVisible && (
        <ModalWindow
          activeShawarma={shawarmas[activeShawarmaIndex]}
          hideModalWindow={hideModalWindow}
        />
      )}
    </div>
  );
}
