import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Main from './pages/Main';
import Contacts from './pages/Contacts';
import Basket from './pages/Basket';
import NotFound from './pages/NotFound';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Main />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="basket" element={<Basket />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
