import React from 'react';
import ReactLoading from 'react-loading';
import { deleteIngredient } from '../../../../http/ingredientAPI';
import { IngredientDeletePropsType } from '../types';
import styles from '../../Admin.module.scss';

const IngredientDelete: React.FC<IngredientDeletePropsType> = ({
  id,
  setIsShowDeleteQuestion,
  setIsShowIngredientList,
}) => {
  const [fetching, setFetching] = React.useState(false);

  const handleDelete = () => {
    setIsShowDeleteQuestion(false);
    setIsShowIngredientList(false);
    setFetching(true);
    deleteIngredient(id)
      .catch((error) => console.log('Не удалось удалить ингредиент'))
      .finally(() => setFetching(false));
  };

  const handleCancel = () => {
    setIsShowDeleteQuestion(false);
  };

  if (fetching) {
    return <ReactLoading type={'spin'} color={'red'} height={80} width={80} />;
  }

  return (
    <div className={styles.modalWin}>
      <div>
        <h2 className={styles.modalWin__header}>Вы уверены, что хотите удалить ингредиент?</h2>
        <div className={styles.modalWin__btnBlock}>
          <button className={styles.modalWin__btn} onClick={handleDelete}>
            Да
          </button>
          <button className={styles.modalWin__btn} onClick={handleCancel}>
            Нет
          </button>
        </div>
      </div>
    </div>
  );
};

export default IngredientDelete;
