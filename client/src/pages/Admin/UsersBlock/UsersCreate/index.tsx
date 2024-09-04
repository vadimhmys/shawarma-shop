import React from 'react';
import ReactLoading from 'react-loading';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createUser } from '../../../../http/adminAPI';
import { UsersCreateFields, UsersCreatePropsType } from '../types';
import styles from '../../Admin.module.scss';

const UsersCreate: React.FC<UsersCreatePropsType> = ({
  setIsShowCreatedUsers,
  isShowCreatedUsers,
}) => {
  const [fetching, setFetching] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UsersCreateFields>({ mode: 'onChange' });
  const onSubmit: SubmitHandler<UsersCreateFields> = (data) => {
    setFetching(true);
    const email = data.email?.trim();
    const password = data.password?.trim();
    const role = data.role ? 'ADMIN' : 'USER';
    createUser(email, password, role)
      .catch(() => console.log('Не удалось создать пользователя'))
      .finally(() => {
        setFetching(false);
        setIsShowCreatedUsers(false);
      });
  };

  if (fetching) {
    return <ReactLoading type={'spin'} color={'red'} height={80} width={80} />;
  }

  return (
    <div className={styles.formWrapper}>
      {isShowCreatedUsers && (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <label className={styles.form__label} htmlFor="createdUsersEmail">
            Введите email!
          </label>
          <input
            id="createdUsersEmail"
            className={styles.form__input}
            {...register('email', {
              required: 'Поле обязательно к заполнению',
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+$/,
                message: 'Некорректный email',
              },
            })}
            placeholder="Email..."
            maxLength={30}
          />
          {errors.email && (
            <div className={styles.form__errorMessage}>{errors.email.message}</div>
          )}

          <label className={styles.form__label} htmlFor="createdUsersPassword">
            Введите пароль!
          </label>
          <input
            id="createdUsersPassword"
            type="password"
            className={styles.form__input}
            {...register('password', {
              required: 'Поле обязательно к заполнению',
              minLength: {
                value: 4,
                message: 'Слишком короткий пароль',
              },
            })}
            placeholder="Пароль..."
            maxLength={15}
          />
          {errors.password && (
            <div className={styles.form__errorMessage}>{errors.password.message}</div>
          )}

          <label className={styles.form__label} htmlFor="createdUsersRole">
            Администратор?
          </label>
          <input
            className={styles.form__checkbox}
            id="createdUsersRole"
            defaultChecked={false}
            {...register('role')}
            type="checkbox"
          />

          <input className={styles.form__btn} type="submit" value="Создать" />
          <input
            className={styles.form__btn}
            type="button"
            value="Отмена"
            onClick={() => setIsShowCreatedUsers(false)}
          />
        </form>
      )}
    </div>
  );
};

export default UsersCreate;
