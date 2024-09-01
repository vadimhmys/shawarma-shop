import React from 'react';
import { Button } from '../../../ui-kit';
import IngredientList from './IngredientList';
import IngredientEdit from './IngredientEdit';
import IngredientDelete from './IngredientDelete';
import IngredientCreate from './IngredientCreate';
import { IngredientType } from './types';
import styles from '../Admin.module.scss';

const IngredientBlock = () => {
  const [isShowIngredientList, setIsShowIngredientList] = React.useState(false);
  const [editableIngredient, setEditableIngredient] = React.useState<IngredientType>({ id: 0, name: '', price: 0, image: '' });
  const [isShowEditableIngredient, setIsShowEditableIngredient] = React.useState(false);
  const [deletedIngredientIndex, setDeletedIngredientIndex] = React.useState(0);
  const [isShowDeleteQuestion, setIsShowDeleteQuestion] = React.useState(false);
  const [isShowCreatedIngredient, setIsShowCreatedIngredient] = React.useState(false);

  const toggleShowingIngredients = () => {
    if (isShowEditableIngredient) return;
    if (isShowCreatedIngredient) return;
    setIsShowIngredientList(!isShowIngredientList);
  };

  const handleCreatingIngredient = () => {
    if (isShowEditableIngredient) return;
    setIsShowIngredientList(false);
    setIsShowEditableIngredient(false);
    setIsShowCreatedIngredient(true);
  };

  return (
    <div className={styles.infoBlock}>
      <h3 className={styles.infoBlock__title}>Ингредиенты</h3>
      <div className={styles.infoBlock__content}>
        <div className={styles.infoBlock__btnsBlock}>
          <Button handleClick={toggleShowingIngredients}>
            {isShowIngredientList ? 'Скрыть' : 'Показать'} список
          </Button>
          <Button handleClick={handleCreatingIngredient}>Новый ингредиент</Button>
        </div>
        {isShowIngredientList && (
          <IngredientList
            setIsShowIngredientList={setIsShowIngredientList}
            setEditableIngredient={setEditableIngredient}
            setIsShowEditableIngredient={setIsShowEditableIngredient}
            setIsShowDeleteQuestion={setIsShowDeleteQuestion}
            setDeletedIngredientIndex={setDeletedIngredientIndex}
          />
        )}
        {isShowEditableIngredient && (
          <IngredientEdit
            ingredient={editableIngredient}
            setIsShowEditableIngredient={setIsShowEditableIngredient}
            isShowEditableIngredient={isShowEditableIngredient}
          />
        )}
        {isShowDeleteQuestion && (
          <IngredientDelete
            id={deletedIngredientIndex}
            setIsShowDeleteQuestion={setIsShowDeleteQuestion}
            setIsShowIngredientList={setIsShowIngredientList}
          />
        )}
        {isShowCreatedIngredient && (
          <IngredientCreate
            setIsShowCreatedIngredient={setIsShowCreatedIngredient}
            isShowCreatedIngredient={isShowCreatedIngredient}
          />
        )}
      </div>
    </div>
  );
};

export default IngredientBlock;
