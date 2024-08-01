import React from 'react';
import PageTitle from '../../components/PageTitle';
import Button from '../../components/Button';
import { useSelector } from 'react-redux';
import { selectBasketItems } from '../../redux/basket/selectors';
import { getTotalPrice } from '../../utils/getTotalPrice';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IOrderFields } from '../../@types/app.interface';

import styles from './Order.module.scss';

/* const intervals = [15, 20, 25, 30, 35, 40, 45];
const paymentMethods = ["Наличными в заведении", "Картой в заведении"]; */

const Order: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IOrderFields>({
    mode: 'onChange',
  });
  const onSubmit: SubmitHandler<IOrderFields> = (data) => console.log(data);
  const items = useSelector(selectBasketItems);
  /* const [name, setName] = React.useState(''); */
  /* const [phone, setPhone] = React.useState('');
  const [comment, setComment] = React.useState('');
  const [time, setTime] = React.useState(15);
  const [paymentMethod, setPaymentMethod] = React.useState('Выберите способ оплаты'); */

  /* const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }; */

  /*
  <div className={styles.info}>
          <h3>Телефон</h3>
          <p>Оставьте ваш номер телефона</p>
          <input
            className={styles.input}
            type="tel"
            name="phone"
            placeholder="+375 (__) ___-__-__"
            value={phone}
            onChange={handlePhoneChange}
            required
          />
          <p className={styles.required}>Это поле обязательно</p>
        </div>
        <div className={styles.info}>
          <h3>Время</h3>
          <p>Через сколько минут заберете</p>
          <input
            className={styles.input}
            type="text"
            name="time"
            value={`${time} минут`}
            readOnly
          />
          <div className={styles.select}>
            {intervals.map((i) => (
              <div className={styles.radioBox} key={i}>
                <input
                  type="radio"
                  name="radio-time"
                  id={`time-${i}`}
                  value={`${i} минут`}
                  onChange={() => handleTimeChange(i)}
                  checked={i === time}
                />
                <label htmlFor={`time-${i}`}>{i} минут</label>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.info}>
          <h3>Комментарий</h3>
          <p>Здесь вы можете оставить комментарий к заказу</p>
          <textarea
            className={styles.comment}
            name="comment"
            value={comment}
            onChange={handleCommentChange}></textarea>
        </div>
        <div className={styles.info}>
          <h3>Оплата</h3>
          <p>Выберите способ оплаты</p>
          <input
            className={styles.input}
            type="text"
            name="payment"
            value={paymentMethod}
            readOnly
          />
          <div className={styles.select}>
            {paymentMethods.map((pm, idx) => (
              <div className={styles.radioBox} key={pm}>
                <input
                  type="radio"
                  name="radio-payment"
                  id={`payment-${idx}`}
                  value={pm}
                  onChange={() => handlePaymentChange(pm)}
                  checked={pm === paymentMethod}
                />
                <label htmlFor={`payment-${idx}`}>{pm}</label>
              </div>
            ))}
          </div>
        </div>
  */

  /* const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleTimeChange = (interval: number) => {
    setTime(interval);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handlePaymentChange = (paymentMethod: string) => {
    setPaymentMethod(paymentMethod);
  }; */

  return (
    <div>
      <PageTitle>Оформление заказа</PageTitle>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)} name="order-form">
        <div className={styles.field}>
          <h3 className={styles.field__title}>Имя</h3>
          <p className={styles.field__subtitle}>Укажите ваше имя</p>
          <input
            className={styles.field__input}
            {...register('name', {
              required: 'Это поле обязательно!',
              minLength: {
                value: 2,
                message: 'Слишком короткое имя',
              },
              maxLength: {
                value: 15,
                message: 'Слишком длинное имя',
              },
            })}
            maxLength={16}
          />
          {errors?.name && <p className={styles.required}>{errors.name.message}</p>}
        </div>
        <div className={styles.bottom}>
          <p>
            Заказ на сумму: <span>{getTotalPrice(items)}</span> руб.
          </p>
          <Button>Оформить заказ</Button>
        </div>
      </form>
    </div>
  );
};

export default Order;
