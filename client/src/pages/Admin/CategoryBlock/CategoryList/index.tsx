import React from 'react';
import ReactLoading from 'react-loading';
import { FaRegTrashCan } from 'react-icons/fa6';
import { CiEdit } from 'react-icons/ci';
import { fetchCategories } from '../../../../http/catalogAPI';
import { CategoryListPropsType, CategoryType } from '..';
import styles from '../../Admin.module.scss';

const CategoryList: React.FC<CategoryListPropsType> = ({
  setIsShowCategoryList,
  setEditableCategory,
  setIsShowEditableCategory,
  setIsShowDeleteQuestion,
  setDeletedCategoryIndex,
}) => {
  const [categories, setCategories] = React.useState<CategoryType[]>([]);
  const [fetching, setFetching] = React.useState(true);

  const handleEditCategory = (id: number, name: string) => {
    setIsShowCategoryList(false);
    setEditableCategory({ id, name });
    setIsShowEditableCategory(true);
  };

  const handleDeleteCategory = (id: number) => {
    setIsShowDeleteQuestion(true);
    setDeletedCategoryIndex(id);
  };

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
                  <CiEdit
                    onClick={() => handleEditCategory(c.id, c.name)}
                    className={styles.listItem__editIcon}
                  />
                </td>
                <td>
                  <FaRegTrashCan
                    onClick={() => handleDeleteCategory(c.id)}
                    className={styles.listItem__trashIcon}
                  />
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
