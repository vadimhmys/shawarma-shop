import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { signup } from '../../http/userAPI';
import { loginUser } from '../../redux/user/slice';
import { UserType } from '../../redux/user/types';
import { selectUser } from '../../redux/user/selectors';

import styles from './Signup.module.scss';

const Signup: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [emailCurrent, setEmailCurrent] = React.useState('');
  const [passwordCurrent, setPasswordCurrent] = React.useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = emailCurrent.trim();
    const password = passwordCurrent.trim();
    const res = await signup(email, password) as UserType;
   
    if (res) {
        const data = {id: res.id, email: res.email, role: res.role};
        dispatch(loginUser(data));
        if (user.isAdmin) navigate('/admin');
        if (user.isAuth) navigate('/user');
    }
}

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
        <h2 className={styles.title}>Регистрация</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input className={styles.input} type='text' placeholder="Введите ваш email..." value={emailCurrent} onChange={onChangeEmail} />
          <input className={styles.input} type='password' placeholder="Введите ваш пароль..." value={passwordCurrent} onChange={onChangePassword} />
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
