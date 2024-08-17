import React from 'react';
import clsx from 'clsx';
import PageTitle from '../../components/PageTitle';
import { Button } from '../../ui-kit';
import styles from './Admin.module.scss';
import CategoryList from './CategoryList';
import CategoryEdit from './CategoryEdit';

export type CategoryType = {
  id: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
};

export type CategoryListPropsType = {
  setIsShowCategoryList: React.Dispatch<React.SetStateAction<boolean>>;
  isShowCategoryList: boolean;
  setEditableCategory: React.Dispatch<React.SetStateAction<CategoryType>>;
  setIsShowEditableCategory: React.Dispatch<React.SetStateAction<boolean>>;
};

export type CategoryInput = {
  category: string;
};

const Admin: React.FC = () => {
  const [isShowCategoryList, setIsShowCategoryList] = React.useState(false);
  const [editableCategory, setEditableCategory] = React.useState<CategoryType>({ id: 0, name: '' });
  const [isShowEditableCategory, setIsShowEditableCategory] = React.useState(false);

  const toggleShowingCategories = () => {
    if (isShowEditableCategory) return;
    setIsShowCategoryList(!isShowCategoryList);
  };

  return (
    <div className={styles.root}>
      <PageTitle>Панель управления</PageTitle>
      <div className={clsx(`${styles.infoBlock}`, `${styles.category}`)}>
        <h3 className={styles.infoBlock__title}>Категории</h3>
        <div className={styles.infoBlock__content}>
          <div className={styles.infoBlock__btnsBlock}>
            <Button handleClick={toggleShowingCategories}>
              {isShowCategoryList ? 'Скрыть' : 'Показать'} список
            </Button>
            <Button>Новая категория</Button>
          </div>
          {isShowCategoryList && (
            <CategoryList
              setIsShowCategoryList={setIsShowCategoryList}
              isShowCategoryList={isShowCategoryList}
              setEditableCategory={setEditableCategory}
              setIsShowEditableCategory={setIsShowEditableCategory}
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
        </div>
      </div>
    </div>
  );
};

export default Admin;
