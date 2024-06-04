import React from 'react';

import styles from './Categories.module.scss';

export default function Categories() {
  const [categories, setCategories] = React.useState([]);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const url = 'http://localhost:7000/api/categories/getall';

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  React.useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((arr) => setCategories(arr));
  }, []);

  return (
    <ul className={styles.list}>
      {categories.map((c, i) => (
        <li
          key={c.id}
          className={i === activeIndex ? `${styles.item} ${styles.active}` : `${styles.item}`}
          onClick={() => handleClick(i)}>
          {c.name}
        </li>
      ))}
    </ul>
  );
}
