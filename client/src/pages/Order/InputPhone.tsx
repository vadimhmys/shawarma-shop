import React from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { IOrderFields } from '../../@types/app.interface';


import styles from './Order.module.scss';

type InputPhonePropsType = {
  errors: FieldErrors<IOrderFields>;
  register: UseFormRegister<IOrderFields>;
};

const InputPhone: React.FC<InputPhonePropsType> = ({ errors, register }) => {
  return (
    <div className={styles.field}>
      <h3 className={styles.field__title}>Телефон</h3>
      <p className={styles.field__subtitle}>Оставьте ваш номер телефона</p>
      <input
        className={styles.field__input}
        {...register('phone', {
          required: 'Это поле обязательно!',
        })}
        placeholder="+375 (__) ___-__-__"
      />
      {errors?.phone && <p className={styles.required}>{errors.phone.message}</p>}
    </div>
  );
};

export default InputPhone;
