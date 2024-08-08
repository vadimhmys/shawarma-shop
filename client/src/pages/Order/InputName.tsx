import React from 'react';
import { InputNamePropsType} from '../../@types/app.forms';

import styles from './Order.module.scss';

const InputName: React.FC<InputNamePropsType> = ({ errors, register }) => {
  return (
    <div className={styles.field}>
      <h3 className={styles.field__title}>Имя</h3>
      <p className={styles.field__subtitle}>Укажите ваше имя</p>
      <input
        className={styles.field__input}
        {...register('userName', {
          required: 'Это поле обязательно!',
          minLength: {
            value: 2,
            message: 'Слишком короткое имя',
          },
          maxLength: {
            value: 15,
            message: 'Слишком длинное имя',
          },
          pattern: {
            value: /^[a-zA-Zа-яА-Я]+$/,
            message: 'Имя должно состоять из букв',
          },
        })}
        maxLength={16}
      />
      {errors?.userName && <p className={styles.errorBlock}>{errors.userName.message}</p>}
    </div>
  );
};

export default InputName;
