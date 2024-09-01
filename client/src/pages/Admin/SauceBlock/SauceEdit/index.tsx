import React from 'react';
import ReactLoading from 'react-loading';
import { SubmitHandler, useForm } from 'react-hook-form';
import { updateSauce } from '../../../../http/sauceAPI';
import { SauceEditFields, SauceEditPropsType } from '../types';
import styles from '../../Admin.module.scss';

const SauceEdit: React.FC<SauceEditPropsType> = ({
  sauce,
  setIsShowEditableSauce,
  isShowEditableSauce,
}) => {
  const [image, setImage] = React.useState<File>();
  const [fetching, setFetching] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SauceEditFields>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<SauceEditFields> = (data) => {
    setFetching(true);
    const info = new FormData();
    info.append('name', data.name.trim());
    info.append('price', data.price + '');
    if (image) info.append('image', image);

    updateSauce(sauce.id, info)
      .catch(() => console.log('Не удалось обновить соус'))
      .finally(() => {
        setFetching(false);
        setIsShowEditableSauce(false);
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
      {isShowEditableSauce && (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <label className={styles.form__label} htmlFor="SauceName">
            Редактировать название
          </label>
          <input
            className={styles.form__input}
            id="SauceName"
            defaultValue={sauce.name}
            {...register('name', { required: true })}
          />
          {errors.name && (
            <div className={styles.form__errorMessage}>Поле обязательно для заполнения</div>
          )}

          <label className={styles.form__label} htmlFor="SaucePrice">
            Редактировать цену
          </label>
          <input
            className={styles.form__input}
            id="SaucePrice"
            defaultValue={sauce.price}
            {...register('price', { required: true })}
          />
          {errors.price && (
            <div className={styles.form__errorMessage}>Поле обязательно для заполнения</div>
          )}

          <label className={styles.form__label} htmlFor="SauceImage">
            Загрузить изображение
          </label>
          <input
            className={styles.form__inputUpload}
            id="SauceImage"
            {...register('image')}
            type="file"
            onChange={(e) => handleImageChange(e)}
          />

          <div className={styles.form__btnsWrapper}>
            <input className={styles.form__btn} type="submit" value="Сохранить" />
            <input
              className={styles.form__btn}
              type="button"
              value="Отмена"
              onClick={() => setIsShowEditableSauce(false)}
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default SauceEdit;
