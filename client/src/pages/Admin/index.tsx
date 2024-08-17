import React from 'react';
import PageTitle from '../../components/PageTitle';
import CategoryBlock from './CategoryBlock';
import styles from './Admin.module.scss';

const Admin: React.FC = () => {
  return (
    <div className={styles.root}>
      <PageTitle>Панель управления</PageTitle>
      <CategoryBlock />
    </div>
  );
};

export default Admin;
