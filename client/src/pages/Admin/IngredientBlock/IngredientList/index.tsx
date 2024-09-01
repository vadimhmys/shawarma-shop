import React from 'react';
import ReactLoading from 'react-loading';
import { FaRegTrashCan } from 'react-icons/fa6';
import { CiEdit } from 'react-icons/ci';
import { fetchIngredients } from '../../../../http/ingredientAPI';
import { IngredientListPropsType, IngredientType } from '../types';
import styles from '../../Admin.module.scss';

const IngredientList: React.FC<IngredientListPropsType> = ({
  setIsShowIngredientList,
  setEditableIngredient,
  setIsShowEditableIngredient,
  setIsShowDeleteQuestion,
  setDeletedIngredientIndex,
}) => {
  const [ingredients, setIngredients] = React.useState<IngredientType[]>([]);
  const [fetching, setFetching] = React.useState(true);

  const handleEditIngredient = (id: number, name: string, price: number, image: string) => {
    setIsShowIngredientList(false);
    setEditableIngredient({ id, name, price, image });
    setIsShowEditableIngredient(true);
  };

  const handleDeleteIngredient = (id: number) => {
    setIsShowDeleteQuestion(true);
    setDeletedIngredientIndex(id);
  };

  React.useEffect(() => {
    fetchIngredients()
      .then((data) => setIngredients(data))
      .finally(() => setFetching(false));
  }, []);

  if (fetching) {
    return <ReactLoading type={'spin'} color={'red'} height={80} width={80} />;
  }

  return (
    <>
      {ingredients.length > 0 ? (
        <table className={styles.infoBlock__list}>
          <thead>
            <tr>
              <th>Ингредиенты</th>
              <th>Редактировать</th>
              <th>Удалить</th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map((i) => (
              <tr key={i.id}>
                <td>{i.name}</td>
                <td>
                  <CiEdit
                    onClick={() => handleEditIngredient(i.id, i.name, i.price, i.image)}
                    className={styles.listItem__editIcon}
                  />
                </td>
                <td>
                  <FaRegTrashCan
                    onClick={() => handleDeleteIngredient(i.id)}
                    className={styles.listItem__trashIcon}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className={styles.infoBlock__emptyList}>Список ингредиентов пустой</p>
      )}
    </>
  );
};

export default IngredientList;
