import React from 'react';
import axios, { AxiosResponse } from 'axios';

import styles from './Categories.module.scss';

type CategoriesProps = {
  value: number;
  onChangeCategory: (id: number) => void;
};

type Category = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

const Categories: React.FC<CategoriesProps> = ({ value, onChangeCategory }) => {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const url = 'http://localhost:7000/api/categories/getall';

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res: AxiosResponse = await axios.get(url);
        setCategories(res.data);
      } catch (err: any) {
        console.log('ERROR: ', err.message);
      }
    };

    fetchData();
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
};

export default Categories;
