import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../../pages/Login';
import Signup from '../../pages/Signup';
import Contacts from '../../pages/Contacts';
import NotFound from '../../pages/NotFound';
import Main from '../../pages/Main';
import User from '../../pages/User';
import Admin from '../../pages/Admin';
import MainLayout from '../../layouts/MainLayout';
import Basket from '../../pages/Basket';

const publicRoutes = [
  { path: '', Component: Main },
  { path: 'login', Component: Login },
  { path: 'signup', Component: Signup },
  { path: 'contacts', Component: Contacts },
  { path: '*', Component: NotFound },
];

const authRoutes = [{ path: 'user', Component: User }, { path: 'basket', Component: Basket }];

const adminRoutes = [{ path: 'admin', Component: Admin }];

const AppRouter: React.FC = () => {
  const isAuth = true;
  const isAdmin = true;
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {publicRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
        {isAuth &&
          authRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        {isAdmin &&
          adminRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
      </Route>
    </Routes>
  );
};

export default AppRouter;