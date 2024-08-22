import React from 'react';
import PageTitle from '../../components/PageTitle';
import CategoryBlock from './CategoryBlock';
import ShawarmaBlock from './ShawarmaBlock';
import styles from './Admin.module.scss';

const Admin: React.FC = () => {
  return (
    <div className={styles.root}>
      <PageTitle>Панель управления</PageTitle>
      <CategoryBlock />
      <ShawarmaBlock />
    </div>
  );
};

export default Admin;
