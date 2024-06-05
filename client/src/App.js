import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Main from './pages/Main';
import Contacts from './pages/Contacts';
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
