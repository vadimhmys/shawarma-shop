import React from 'react';
import axios from 'axios';
import styles from './Categories.module.scss';

type CategoriesPropsType = {
  value: number;
  onChangeCategory: (id: number) => void;
};

type CategoryType = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

const Categories: React.FC<CategoriesPropsType> = React.memo(({ value, onChangeCategory }) => {
  const [categories, setCategories] = React.useState<CategoryType[]>([]);
  const url = `${process.env.REACT_APP_API_URL}categories/getall`;

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get<CategoryType[]>(url);
        setCategories(data);
      } catch (err) {
        if (err instanceof Error) {
          console.log('ERROR: ', err.message);
        }
      }
    };

    fetchData();
  }, [url]);

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
});

export default Categories;
