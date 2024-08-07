import React from 'react';
import { InputPhonePropsType } from '../../@types/app.forms';
import styles from './Order.module.scss';

const InputPhone: React.FC<InputPhonePropsType> = React.forwardRef<
  HTMLInputElement,
  InputPhonePropsType
>(({ errors, register }, ref) => {
  return (
    <div className={styles.field}>
      <h3 className={styles.field__title}>Телефон</h3>
      <p className={styles.field__subtitle}>Оставьте ваш номер телефона</p>
      <input
        className={styles.field__input}
        {...register('phone', {
          required: 'Это поле обязательно!',
          validate: (value) => {
            return !value.includes('_') || 'Введите номер телефона полностью';
          },
        })}
        placeholder="+375 (__) ___-__-__"
        ref={ref}
      />
      {errors?.phone && <p className={styles.errorBlock}>{errors.phone.message}</p>}
    </div>
  );
});

export default InputPhone;
