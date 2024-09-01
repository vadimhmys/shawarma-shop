import React from 'react';
import ReactLoading from 'react-loading';
import { SubmitHandler, useForm } from 'react-hook-form';
import { updateIngredient } from '../../../../http/ingredientAPI';
import { IngredientEditFields, IngredientEditPropsType } from '../types';
import styles from '../../Admin.module.scss';

const IngredientEdit: React.FC<IngredientEditPropsType> = ({
  ingredient,
  setIsShowEditableIngredient,
  isShowEditableIngredient,
}) => {
  const [image, setImage] = React.useState<File>();
  const [fetching, setFetching] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IngredientEditFields>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<IngredientEditFields> = (data) => {
    setFetching(true);
    const info = new FormData();
    info.append('name', data.name.trim());
    info.append('price', data.price + '');
    if (image) info.append('image', image);

    updateIngredient(ingredient.id, info)
      .catch(() => console.log('Не удалось обновить ингредиент'))
      .finally(() => {
        setFetching(false);
        setIsShowEditableIngredient(false);
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
      {isShowEditableIngredient && (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <label className={styles.form__label} htmlFor="IngredientName">
            Редактировать название
          </label>
          <input
            className={styles.form__input}
            id="IngredientName"
            defaultValue={ingredient.name}
            {...register('name', { required: true })}
          />
          {errors.name && (
            <div className={styles.form__errorMessage}>Поле обязательно для заполнения</div>
          )}

          <label className={styles.form__label} htmlFor="IngredientPrice">
            Редактировать цену
          </label>
          <input
            className={styles.form__input}
            id="IngredientPrice"
            defaultValue={ingredient.price}
            {...register('price', { required: true })}
          />
          {errors.price && (
            <div className={styles.form__errorMessage}>Поле обязательно для заполнения</div>
          )}

          <label className={styles.form__label} htmlFor="IngredientImage">
            Загрузить изображение
          </label>
          <input
            className={styles.form__inputUpload}
            id="IngredientImage"
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
              onClick={() => setIsShowEditableIngredient(false)}
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default IngredientEdit;
