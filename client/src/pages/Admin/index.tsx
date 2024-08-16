import React from 'react';
import clsx from 'clsx';
import PageTitle from '../../components/PageTitle';
import { Button } from '../../ui-kit';
import styles from './Admin.module.scss';
import CategoryList from './CategoryList';

const Admin: React.FC = () => {
  return (
    <div className={styles.root}>
      <PageTitle>Панель управления</PageTitle>
      <div className={clsx(`${styles.infoBlock}`, `${styles.category}`)}>
        <h3 className={styles.infoBlock__title}>Категории</h3>
        <div className={styles.infoBlock__content}>
          <div className={styles.infoBlock__btnsBlock}>
            <Button>Список категорий</Button>
            <Button>Новая категория</Button>
          </div>
          <CategoryList />
        </div>
      </div>
    </div>
  );
};

export default Admin;
