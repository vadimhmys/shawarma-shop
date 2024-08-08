import React from 'react';
import IMask from 'imask';
import PageTitle from '../../components/PageTitle';
import Button from '../../ui-kit/Button';
import { useSelector } from 'react-redux';
import { selectBasketItems } from '../../redux/basket/selectors';
import { getTotalPrice } from '../../utils/getTotalPrice';
import { useForm, SubmitHandler } from 'react-hook-form';
import { InputRefType, IOrderFields, PrevMaskType } from '../../@types/app.forms';
import InputName from './InputName';
import InputPhone from './InputPhone';
import SelectTime from './SelectTime';
import styles from './Order.module.scss';

/* const intervals = [15, 20, 25, 30, 35, 40, 45];
const paymentMethods = ["Наличными в заведении", "Картой в заведении"]; */

const maskOptions = {
  mask: '+375(00) 000-00-00',
  lazy: false,
};

const Order: React.FC = () => {
  const prevMask: PrevMaskType = React.useRef(null);
  const inputRef: InputRefType = React.useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    control
  } = useForm<IOrderFields>({
    mode: 'onChange',
    defaultValues: {
      userName: '',
      phone: '',
    },
  });

  const createMask = (IMask: any) => {
    const element = inputRef.current;
    if (element) {
      const mask = new IMask(element, maskOptions);
      return mask;
    }
    return null;
  };

  React.useEffect(() => {
    const mask = createMask(IMask);
    prevMask.current = mask;
    if (mask) {
      mask.on('accept', () => {
        setValue('phone', `${mask.value}`);
      });
    }
  }, [setValue]);

  const onSubmit: SubmitHandler<IOrderFields> = (data) => {
    console.log('data: ', data);
    reset();
    prevMask.current?.destroy();
    const mask = createMask(IMask);
    prevMask.current = mask;
    if (mask) {
      mask.on('accept', () => {
        setValue('phone', `${mask.value}`);
      });
    }
  };

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
        <InputName errors={errors} register={register} />
        <InputPhone errors={errors} register={register} ref={inputRef} />
        <SelectTime control={control}/>
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
