import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import styles from './MainLayout.module.scss';

export default function MainLayout() {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <Header />
          <Outlet/>
        <Footer />
      </div>
    </div>
  )
}
