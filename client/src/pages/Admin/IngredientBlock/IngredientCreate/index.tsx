import React from 'react';
import ReactLoading from 'react-loading';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createIngredient } from '../../../../http/ingredientAPI';
import { IngredientCreateFields, IngredientCreatePropsType } from '../types';
import styles from '../../Admin.module.scss';

const IngredientCreate: React.FC<IngredientCreatePropsType> = ({
  setIsShowCreatedIngredient,
  isShowCreatedIngredient,
}) => {
  const [fetching, setFetching] = React.useState(false);
  const [image, setImage] = React.useState<File>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IngredientCreateFields>({ mode: 'onChange' });
  const onSubmit: SubmitHandler<IngredientCreateFields> = (data) => {
    setFetching(true);
    const ingredient = new FormData();
    ingredient.append('name', data.name.trim());
    ingredient.append('price', data.price + '');
    if (image) ingredient.append('image', image);
    createIngredient(ingredient)
      .catch(() => console.log('Не удалось создать ингредиент'))
      .finally(() => {
        setFetching(false);
        setIsShowCreatedIngredient(false);
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
      {isShowCreatedIngredient && (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <label className={styles.form__label} htmlFor="createdIngredientName">
            Напишите название ингредиента!
          </label>
          <input
            id="createdIngredientName"
            className={styles.form__input}
            {...register('name', { required: true })}
            placeholder="Название..."
            maxLength={30}
          />
          {errors.name && (
            <div className={styles.form__errorMessage}>Поле обязательно для заполнения</div>
          )}

          <label className={styles.form__label} htmlFor="createdIngredientPrice">
            Напишите цену ингредиента!
          </label>
          <input
            id="createdIngredientPrice"
            className={styles.form__input}
            {...register('price', { required: true })}
            placeholder="Цена..."
            maxLength={30}
          />
          {errors.price && (
            <div className={styles.form__errorMessage}>Поле обязательно для заполнения</div>
          )}

          <label className={styles.form__label} htmlFor="IngredientCreateImage">
            Загрузить изображение
          </label>
          <input
            className={styles.form__inputUpload}
            id="IngredientCreateImage"
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
            onClick={() => setIsShowCreatedIngredient(false)}
          />
        </form>
      )}
    </div>
  );
};

export default IngredientCreate;
