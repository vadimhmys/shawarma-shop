import React from 'react';
import ReactLoading from 'react-loading';
import { FaRegTrashCan } from 'react-icons/fa6';
import { CiEdit } from "react-icons/ci";
import { fetchCategories } from '../../../http/catalogAPI';
import styles from '../Admin.module.scss';

export type CategoryType = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

const CategoryList: React.FC = () => {
  const [categories, setCategories] = React.useState<CategoryType[]>([]);
  const [fetching, setFetching] = React.useState(true);

  React.useEffect(() => {
    fetchCategories()
      .then((data) => setCategories(data))
      .finally(() => setFetching(false));
  }, []);

  if (fetching) {
    return <ReactLoading type={'spin'} color={'red'} height={80} width={80} />;
  }

  return (
    <>
      {categories.length > 0 ? (
        <table className={styles.infoBlock__list}>
          <thead>
            <tr>
              <th>Категория</th>
              <th>Редактировать</th>
              <th>Удалить</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>
                  <CiEdit onClick={() => alert('Редактировать')} className={styles.listItem__editIcon}/>
                </td>
                <td>
                  <FaRegTrashCan onClick={() => alert('Удалить')} className={styles.listItem__trashIcon} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className={styles.infoBlock__emptyList}>Список категорий пустой</p>
      )}
    </>
  );
};

export default CategoryList;
