import React from 'react';
import clsx from 'clsx';
import { Button } from '../../../ui-kit';
import CategoryList from './CategoryList';
import CategoryEdit from './CategoryEdit';
import CategoryDelete from './CategoryDelete';
import CategoryCreate from './CategoryCreate';
import styles from '../Admin.module.scss';

export type CategoryType = {
  id: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
};

export type CategoryListPropsType = {
  setIsShowCategoryList: React.Dispatch<React.SetStateAction<boolean>>;
  setEditableCategory: React.Dispatch<React.SetStateAction<CategoryType>>;
  setIsShowEditableCategory: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowDeleteQuestion: React.Dispatch<React.SetStateAction<boolean>>;
  setDeletedCategoryIndex: React.Dispatch<React.SetStateAction<number>>;
};

export type CategoryInputEdit = {
  categoryEdit: string;
};

export type CategoryInputCreate = {
  categoryCreate: string;
};

export type CategoryEditPropsType = {
  id: number;
  name: string;
  setIsShowEditableCategory: React.Dispatch<React.SetStateAction<boolean>>;
  isShowEditableCategory: boolean;
};

export type CategoryDeletePropsType = {
  id: number;
  setIsShowDeleteQuestion: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowCategoryList: React.Dispatch<React.SetStateAction<boolean>>;
};

export type CategoryCreatePropsType = {
  setIsShowCreatedCategory: React.Dispatch<React.SetStateAction<boolean>>;
  isShowCreatedCategory: boolean;
};

const CategoryBlock = () => {
  const [isShowCategoryList, setIsShowCategoryList] = React.useState(false);
  const [editableCategory, setEditableCategory] = React.useState<CategoryType>({ id: 0, name: '' });
  const [isShowEditableCategory, setIsShowEditableCategory] = React.useState(false);
  const [deletedCategoryIndex, setDeletedCategoryIndex] = React.useState(0);
  const [isShowDeleteQuestion, setIsShowDeleteQuestion] = React.useState(false);
  const [isShowCreatedCategory, setIsShowCreatedCategory] = React.useState(false);

  const toggleShowingCategories = () => {
    if (isShowEditableCategory) return;
    if (isShowCreatedCategory) return;
    setIsShowCategoryList(!isShowCategoryList);
  };

  const handleCreatingCategory = () => {
    if (isShowEditableCategory) return;
    setIsShowCategoryList(false);
    setIsShowEditableCategory(false);
    setIsShowCreatedCategory(true);
  };

  return (
    <div className={clsx(`${styles.infoBlock}`, `${styles.category}`)}>
      <h3 className={styles.infoBlock__title}>Категории</h3>
      <div className={styles.infoBlock__content}>
        <div className={styles.infoBlock__btnsBlock}>
          <Button handleClick={toggleShowingCategories}>
            {isShowCategoryList ? 'Скрыть' : 'Показать'} список
          </Button>
          <Button handleClick={handleCreatingCategory}>Новая категория</Button>
        </div>
        {isShowCategoryList && (
          <CategoryList
            setIsShowCategoryList={setIsShowCategoryList}
            setEditableCategory={setEditableCategory}
            setIsShowEditableCategory={setIsShowEditableCategory}
            setIsShowDeleteQuestion={setIsShowDeleteQuestion}
            setDeletedCategoryIndex={setDeletedCategoryIndex}
          />
        )}
        {isShowEditableCategory && (
          <CategoryEdit
            id={editableCategory.id}
            name={editableCategory.name}
            setIsShowEditableCategory={setIsShowEditableCategory}
            isShowEditableCategory={isShowEditableCategory}
          />
        )}
        {isShowDeleteQuestion && (
          <CategoryDelete
            id={deletedCategoryIndex}
            setIsShowDeleteQuestion={setIsShowDeleteQuestion}
            setIsShowCategoryList={setIsShowCategoryList}
          />
        )}
        {isShowCreatedCategory && (
          <CategoryCreate
            setIsShowCreatedCategory={setIsShowCreatedCategory}
            isShowCreatedCategory={isShowCreatedCategory}
          />
        )}
      </div>
    </div>
  );
};

export default CategoryBlock;
