import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import styles from './MainLayout.module.scss';

const MainLayout: React.FC = () => {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <NavBar/>
        <Header/>
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
