import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/user/selectors';
import Login from '../../pages/Login';
import Signup from '../../pages/Signup';
import NotFound from '../../pages/NotFound';
import Main from '../../pages/Main';
import User from '../../pages/User';
import Admin from '../../pages/Admin';
import MainLayout from '../../layouts/MainLayout';
import Basket from '../../pages/Basket';
import Order from '../../pages/Order';

const publicRoutes = [
  { path: '', Component: Main },
  { path: 'login', Component: Login },
  { path: 'signup', Component: Signup },
  { path: 'basket', Component: Basket },
  { path: '*', Component: NotFound },
];
const authRoutes = [
  { path: 'user', Component: User },
  { path: 'order', Component: Order },
];
const adminRoutes = [{ path: 'admin', Component: Admin }];

const AppRouter: React.FC = () => {
  const { isAuth, isAdmin } = useSelector(selectUser);

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
