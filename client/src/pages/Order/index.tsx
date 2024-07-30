import React from 'react';
import PageTitle from '../../components/PageTitle';

import styles from './Order.module.scss';
import Button from '../../components/Button';

const intervals = [15, 20, 25, 30, 35, 40, 45];
const paymentMethods = ["Наличными в заведении", "Картой в заведении"];

const Order: React.FC = () => {
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [comment, setComment] = React.useState('');
  const [time, setTime] = React.useState(15);
  const [paymentMethod, setPaymentMethod] = React.useState('Выберите способ оплаты');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  };

  return (
    <div>
      <PageTitle>Оформление заказа</PageTitle>
      <form className={styles.form} method="post" name="order-form">
        <div className={styles.info}>
          <h3>Имя</h3>
          <p>Укажите ваше имя</p>
          <input
            className={styles.input}
            type="text"
            name="name"
            value={name}
            onChange={handleNameChange}
            required
            maxLength={20}
          />
          <p className={styles.required}>Это поле обязательно</p>
        </div>
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
        <div className={styles.bottom}>
          <p>Заказ на сумму: <span>10</span> руб.</p>
          <Button>Оформить заказ</Button>
        </div>
      </form>
    </div>
  );
};

export default Order;
