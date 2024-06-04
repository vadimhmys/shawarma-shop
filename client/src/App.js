import React from 'react';

import Header from './components/Header';
import Main from './pages/Main';

import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <Header />
        <Main />
      </div>
    </div>
  );
}

export default App;
