import React from 'react';
import ReactLoading from 'react-loading';
import { SubmitHandler, useForm } from 'react-hook-form';
import { updateUser } from '../../../../http/adminAPI';
import { UsersEditFields, UsersEditPropsType } from '../types';
import styles from '../../Admin.module.scss';

const UsersEdit: React.FC<UsersEditPropsType> = ({
  users,
  setIsShowEditableUsers,
  isShowEditableUsers,
}) => {
  const [fetching, setFetching] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UsersEditFields>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<UsersEditFields> = (data) => {
    setFetching(true);
    const email = data.email?.trim();
    const password = data.password?.trim();
    const role = data.role ? 'ADMIN' : 'USER';

    updateUser(users.id, email, password, role)
      .catch(() => console.log('Не удалось обновить пользователя'))
      .finally(() => {
        setFetching(false);
        setIsShowEditableUsers(false);
      });
  };

  if (fetching) {
    return <ReactLoading type={'spin'} color={'red'} height={80} width={80} />;
  }

  return (
    <div className={styles.formWrapper}>
      {isShowEditableUsers && (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <label className={styles.form__label} htmlFor="UsersEmail">
            Редактировать email
          </label>
          <input
            className={styles.form__input}
            id="UsersEmail"
            defaultValue={users.email}
            {...register('email', {
              required: 'Поле обязательно к заполнению',
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+$/,
                message: 'Некорректный email',
              },
            })}
          />
          {errors.email && (
            <div className={styles.form__errorMessage}>{errors.email.message}</div>
          )}

          <label className={styles.form__label} htmlFor="UsersPassword">
            Редактировать пароль
          </label>
          <input
            className={styles.form__input}
            id="UsersPassword"
            type="password"
            placeholder="Введите новый пароль..."
            maxLength={15}
            {...register('password', {
              required: 'Поле обязательно к заполнению',
              minLength: {
                value: 4,
                message: 'Слишком короткий пароль',
              },
            })}
          />
          {errors.password && (
            <div className={styles.form__errorMessage}>{errors.password.message}</div>
          )}

          <label className={styles.form__label} htmlFor="usersRole">
            Администратор?
          </label>
          <input
            className={styles.form__checkbox}
            id="usersRole"
            defaultChecked={users.role === 'ADMIN'}
            {...register('role')}
            type="checkbox"
          />

          <div className={styles.form__btnsWrapper}>
            <input className={styles.form__btn} type="submit" value="Сохранить" />
            <input
              className={styles.form__btn}
              type="button"
              value="Отмена"
              onClick={() => setIsShowEditableUsers(false)}
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default UsersEdit;
