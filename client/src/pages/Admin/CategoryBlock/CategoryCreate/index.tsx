import React from 'react';
import ReactLoading from 'react-loading';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CategoryCreatePropsType, CategoryInputCreate } from '../types';
import { createCategory } from '../../../../http/categoryAPI';
import styles from '../../Admin.module.scss';

const CategoryCreate: React.FC<CategoryCreatePropsType> = ({
  setIsShowCreatedCategory,
  isShowCreatedCategory,
}) => {
  const [fetching, setFetching] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryInputCreate>({ mode: 'onChange' });
  const onSubmit: SubmitHandler<CategoryInputCreate> = (data) => {
    setFetching(true);
    createCategory(data.categoryCreate)
      .catch((error) => console.log('Не удалось создать категорию'))
      .finally(() => {
        setFetching(false);
        setIsShowCreatedCategory(false);
      });
  };

  if (fetching) {
    return <ReactLoading type={'spin'} color={'red'} height={80} width={80} />;
  }

  return (
    <div className={styles.formWrapper}>
      {isShowCreatedCategory && (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <input
            className={styles.form__input}
            {...register('categoryCreate', { required: true })}
            placeholder="Напишите название категории..."
            maxLength={30}
          />
          <input className={styles.form__btn} type="submit" value="Создать" />
          <input
            className={styles.form__btn}
            type="button"
            value="Отмена"
            onClick={() => setIsShowCreatedCategory(false)}
          />
          {errors.categoryCreate && (
            <div className={styles.form__errorMessage}>Поле не должно быть пустым!</div>
          )}
        </form>
      )}
    </div>
  );
};

export default CategoryCreate;
