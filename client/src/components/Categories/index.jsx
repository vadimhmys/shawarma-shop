import React from 'react';
import axios from 'axios';

import styles from './Categories.module.scss';

export default function Categories({ value, onChangeCategory }) {
  const [categories, setCategories] = React.useState([]);

  const url = 'http://localhost:7000/api/categories/getall';

  React.useEffect(() => {
    axios.get(url).then((res) => {
      setCategories(res.data);
    });
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
