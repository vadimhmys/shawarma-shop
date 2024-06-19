import React from 'react';

import styles from './Categories.module.scss';

export default function Categories({value, onChangeCategory}) {
  const [categories, setCategories] = React.useState([]);

  const url = 'http://localhost:7000/api/categories/getall';

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
          className={i === value ? `${styles.item} ${styles.active}` : `${styles.item}`}
          onClick={() => onChangeCategory(i)}>
          {c.name}
        </li>
      ))}
    </ul>
  );
}
