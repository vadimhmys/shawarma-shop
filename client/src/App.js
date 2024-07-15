import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Main from './pages/Main';
import Contacts from './pages/Contacts';
import Basket from './pages/Basket';
import NotFound from './pages/NotFound';

import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
