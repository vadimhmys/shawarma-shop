import React from 'react';
import ReactLoading from 'react-loading';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createSauce } from '../../../../http/sauceAPI';
import { SauceCreateFields, SauceCreatePropsType } from '../types';
import styles from '../../Admin.module.scss';

const SauceCreate: React.FC<SauceCreatePropsType> = ({
  setIsShowCreatedSauce,
  isShowCreatedSauce,
}) => {
  const [fetching, setFetching] = React.useState(false);
  const [image, setImage] = React.useState<File>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SauceCreateFields>({ mode: 'onChange' });
  const onSubmit: SubmitHandler<SauceCreateFields> = (data) => {
    setFetching(true);
    const sauce = new FormData();
    sauce.append('name', data.name.trim());
    sauce.append('price', data.price + '');
    if (image) sauce.append('image', image);
    createSauce(sauce)
      .catch(() => console.log('Не удалось создать соус'))
      .finally(() => {
        setFetching(false);
        setIsShowCreatedSauce(false);
      });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target) {
      setImage(event.target.files?.[0]);
    }
  };

  if (fetching) {
    return <ReactLoading type={'spin'} color={'red'} height={80} width={80} />;
  }

  return (
    <div className={styles.formWrapper}>
      {isShowCreatedSauce && (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <label className={styles.form__label} htmlFor="createdSauceName">
            Напишите название соуса!
          </label>
          <input
            id="createdSauceName"
            className={styles.form__input}
            {...register('name', { required: true })}
            placeholder="Название..."
            maxLength={30}
          />
          {errors.name && (
            <div className={styles.form__errorMessage}>Поле обязательно для заполнения</div>
          )}

          <label className={styles.form__label} htmlFor="createdSaucePrice">
            Напишите цену соуса!
          </label>
          <input
            id="createdSaucePrice"
            className={styles.form__input}
            {...register('price', { required: true })}
            placeholder="Цена..."
            maxLength={30}
          />
          {errors.price && (
            <div className={styles.form__errorMessage}>Поле обязательно для заполнения</div>
          )}

          <label className={styles.form__label} htmlFor="SauceCreateImage">
            Загрузить изображение
          </label>
          <input
            className={styles.form__inputUpload}
            id="SauceCreateImage"
            {...register('image', { required: true })}
            type="file"
            onChange={(e) => handleImageChange(e)}
          />
          {errors.image && (
            <div className={styles.form__errorMessage}>Изображение обязательно!</div>
          )}

          <input className={styles.form__btn} type="submit" value="Создать" />
          <input
            className={styles.form__btn}
            type="button"
            value="Отмена"
            onClick={() => setIsShowCreatedSauce(false)}
          />
        </form>
      )}
    </div>
  );
};

export default SauceCreate;
