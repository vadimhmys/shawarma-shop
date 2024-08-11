import React from 'react';
import IMask from 'imask';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../redux/store';
import { IOrderFields } from '../../../redux/order/types';
import { createOrder } from '../../../redux/order/slice';
import { fetchOrder } from '../../../redux/order/asyncAction';
import { selectBasketItems } from '../../../redux/basket/selectors';
import { Button, Input, TextArea } from '../../../ui-kit';
import Select from '../../../ui-kit/Select';
import { getTotalPrice } from '../../../utils/getTotalPrice';
import { InputRefType, IOption, maskOptionsType, PrevMaskType } from '../../../@types/app.forms';
import InputPhone from '../../../ui-kit/InputPhone';
import styles from './OrderForm.module.scss';
import { useNavigate } from 'react-router-dom';

const maskOptions: maskOptionsType = {
  mask: '+375(00) 000-00-00',
  lazy: false,
};

const timeSelectOptions: IOption[] = [
  {
    value: 15,
    label: 'Через 15 минут',
  },
  {
    value: 20,
    label: 'Через 20 минут',
  },
  {
    value: 25,
    label: 'Через 25 минут',
  },
  {
    value: 30,
    label: 'Через 30 минут',
  },
  {
    value: 35,
    label: 'Через 35 минут',
  },
  {
    value: 40,
    label: 'Через 40 минут',
  },
  {
    value: 45,
    label: 'Через 45 минут',
  },
];

const paymentSelectOptions: IOption[] = [
  {
    value: 'CASH',
    label: 'Наличными в заведении',
  },
  {
    value: 'CARD',
    label: 'Картой в заведении',
  },
];

export const OrderForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const prevMask: PrevMaskType = React.useRef(null);
  const inputRef: InputRefType = React.useRef(null);
  const items = useSelector(selectBasketItems);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    control,
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

  const onSubmit: SubmitHandler<IOrderFields> = async (data) => {
    reset();
    prevMask.current?.destroy();
    const mask = createMask(IMask);
    prevMask.current = mask;
    if (mask) {
      mask.on('accept', () => {
        setValue('phone', `${mask.value}`);
      });
    }
    try {
      dispatch(createOrder({ ...data, items }));
      await dispatch(fetchOrder({ ...data, items }));
      navigate('/user');
    } catch (error: any) {
      console.log(error.message);
    }
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

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} name="order-form">
      <Input
        errors={errors}
        register={register}
        wrapperClassName="field"
        titleClassName="field__title"
        subtitleClassName="field__subtitle"
        titleContent="Имя"
        subtitleContent="Укажите ваше имя"
        inputClassName="field__input"
        isRequired={true}
        requiredMessage="Это поле обязательно!"
        name="userName"
        minLength={{
          value: 2,
          message: 'Слишком короткое имя',
        }}
        maxLength={{
          value: 15,
          message: 'Слишком длинное имя',
        }}
        pattern={{
          value: /^[a-zA-Zа-яА-Я]+$/,
          message: 'Имя должно состоять из букв',
        }}
        maxCharCount={16}
        type="text"
        errorClassName="errorBlock"
      />
      <InputPhone errors={errors} register={register} ref={inputRef} />
      <Select
        wrapperClassName="selectWrapper"
        titleClassName="selectTitle"
        title="Время"
        control={control}
        name="waitingTime"
        isRequired={true}
        requiredMessage="Укажите время"
        options={timeSelectOptions}
        defaultValue={15}
        errorClassName="errorBlock"
        placeholder="Через сколько минут заберете"
        classNamePrefix="customSelect"
        isSearchable={false}
      />
      <TextArea
        wrapperClassName="textWrapper"
        titleClassName="textTitle"
        subtitleClassName="textSubtitle"
        textAreaClassName="comment"
        title="Комментарий"
        subtitle="Здесь вы можете оставить свой комментарий"
        control={control}
        name="comment"
        isRequired={false}
        defaultValue=""
        errorClassName="errorBlock"
        placeholder="Комментарий к заказу"
        maxLength={{
          value: 200,
          message: 'Слишком длинный комментарий',
        }}
        maxCharCount={201}
      />
      <Select
        wrapperClassName="selectWrapper"
        titleClassName="selectTitle"
        title="Оплата"
        control={control}
        name="payment"
        isRequired={true}
        requiredMessage="Укажите способ оплаты"
        options={paymentSelectOptions}
        defaultValue="CASH"
        errorClassName="errorBlock"
        placeholder="Способ оплаты"
        classNamePrefix="customSelect"
        isSearchable={false}
      />
      <div className={styles.bottom}>
        <p>
          Заказ на сумму: <span>{getTotalPrice(items)}</span> руб.
        </p>
        <Button>Оформить заказ</Button>
      </div>
    </form>
  );
};
