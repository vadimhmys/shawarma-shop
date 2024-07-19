import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';

import styles from './Signup.module.scss';

const Signup: React.FC = () => {
  const { isAdmin, isAuth } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  React.useEffect(() => {
    if (isAdmin) navigate('/admin', { replace: true });
    if (isAuth) navigate('/user', { replace: true });
  }, [isAdmin, isAuth, navigate]);

  return (
    <div className={styles.root}>
      <div className={styles.card}>
        <h2 className={styles.title}>Регистрация</h2>
        <form className={styles.form}>
          <input className={styles.input} type='text' placeholder="Введите ваш email..." value={email} onChange={onChangeEmail} />
          <input className={styles.input} type='password' placeholder="Введите ваш пароль..." value={password} onChange={onChangePassword} />
          <div className={styles.bottom}>
            <Button type="submit">Регистрация</Button>
            <p className={styles.question}>
              Уже есть аккаунт? <Link to="/login" className={styles.link}>Войдите!</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
