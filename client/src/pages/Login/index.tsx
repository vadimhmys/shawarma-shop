import React from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store';
import { selectUser } from '../../redux/user/selectors';
import { loginUser } from '../../redux/user/slice';
import { UserType } from '../../redux/user/types';
import { fetchShawarmasFromLS } from '../../redux/basket/asyncAction';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../http/userAPI';
import Button from '../../ui-kit/Button';

import styles from './Login.module.scss';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [emailCurrent, setEmailCurrent] = React.useState('');
  const [passwordCurrent, setPasswordCurrent] = React.useState('');

  const sendShawarmasFromLSToDB = async (id: number) => {
    const json = localStorage.getItem('shawarmaBasket');
    const items = json ? JSON.parse(json) : [];
    if (items.length !== 0) {
      dispatch(fetchShawarmasFromLS({ items, userId: id }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailCurrent.trim();
    const password = passwordCurrent.trim();
    const res = (await login(email, password)) as UserType;

    if (res) {
      const data = { id: res.id, email: res.email, role: res.role };
      dispatch(loginUser(data));

      try {
        await sendShawarmasFromLSToDB(res.id);
      } catch (error: any) {
        console.log(error.message);
      }

      if (user.isAdmin) navigate('/admin');
      if (user.isAuth) navigate('/user');
    }
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailCurrent(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordCurrent(e.target.value);
  };

  React.useEffect(() => {
    if (user.isAdmin) navigate('/admin', { replace: true });
    if (user.isAuth) navigate('/user', { replace: true });
  }, [user.isAdmin, user.isAuth, navigate]);

  return (
    <div className={styles.root}>
      <div className={styles.card}>
        <h2 className={styles.title}>Авторизация</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="text"
            placeholder="Введите ваш email..."
            value={emailCurrent}
            onChange={onChangeEmail}
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Введите ваш пароль..."
            value={passwordCurrent}
            onChange={onChangePassword}
          />
          <div className={styles.bottom}>
            <Button type="submit">Войти</Button>
            <p className={styles.question}>
              Нет аккаунта?{' '}
              <Link to="/signup" className={styles.link}>
                Зарегистрирутесь!
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
