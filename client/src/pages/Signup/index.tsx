import React from 'react';
import { useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../ui-kit/Button';
import { signup } from '../../http/userAPI';
import { loginUser } from '../../redux/user/slice';
import { UserType } from '../../redux/user/types';
import { selectUser } from '../../redux/user/selectors';
import { fetchShawarmasFromLS } from '../../redux/basket/asyncAction';
import styles from './Signup.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';

export interface ISignupFormData {
  email: string;
  password: string;
}

const Signup: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupFormData>({ mode: 'onChange' });
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const sendShawarmasFromLSToDB = async (id: number) => {
    const json = localStorage.getItem('shawarmaBasket');
    const items = json ? JSON.parse(json) : [];
    if (items.length !== 0) {
      dispatch(fetchShawarmasFromLS({ items, userId: id }));
    }
  };

  const onSubmit: SubmitHandler<ISignupFormData> = async (data) => {
    const { email, password } = data;
    const res = (await signup(email, password)) as UserType;

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

  React.useEffect(() => {
    if (user.isAdmin) navigate('/admin', { replace: true });
    if (user.isAuth) navigate('/user', { replace: true });
  }, [user.isAdmin, user.isAuth, navigate]);

  return (
    <div className={styles.root}>
      <div className={styles.card}>
        <h2 className={styles.title}>Регистрация</h2>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register('email', {
              required: 'Поле обязательно к заполнению',
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+$/,
                message: 'Некорректный email',
              },
            })}
            className={styles.input}
            type="text"
            placeholder="Введите ваш email..."
          />
          {errors?.email && <p className={styles.errorBlock}>{errors.email.message}</p>}
          <input
            {...register('password', {
              required: 'Поле обязательно к заполнению',
              minLength: {
                value: 4,
                message: 'Слишком короткий пароль',
              },
            })}
            className={styles.input}
            type="password"
            placeholder="Введите ваш пароль..."
            maxLength={15}
          />
          {errors.password && <p className={styles.errorBlock}>{errors.password.message}</p>}
          <div className={styles.bottom}>
            <Button type="submit">Регистрация</Button>
            <p className={styles.question}>
              Уже есть аккаунт?{' '}
              <Link to="/login" className={styles.link}>
                Войдите!
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
