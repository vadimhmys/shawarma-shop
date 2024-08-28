import React from 'react';
import ReactLoading from 'react-loading';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CategoryEditPropsType, CategoryInputEdit } from '../types';
import { updateCategory } from '../../../../http/catalogAPI';
import styles from '../../Admin.module.scss';

const CategoryEdit: React.FC<CategoryEditPropsType> = ({
  id,
  name,
  setIsShowEditableCategory,
  isShowEditableCategory,
}) => {
  const [fetching, setFetching] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryInputEdit>({ mode: 'onChange' });
  const onSubmit: SubmitHandler<CategoryInputEdit> = (data) => {
    setFetching(true);
    updateCategory(id, data.categoryEdit)
      .catch((error) => console.log('Не удалось обновить категорию'))
      .finally(() => {
        setFetching(false);
        setIsShowEditableCategory(false);
      });
  };

  if (fetching) {
    return <ReactLoading type={'spin'} color={'red'} height={80} width={80} />;
  }

  return (
    <div className={styles.formWrapper}>
      {isShowEditableCategory && (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <input className={styles.form__input} defaultValue={name} {...register('categoryEdit', { required: true })} />
          <input className={styles.form__btn} type="submit" value="Сохранить"/>
          <input className={styles.form__btn} type="button" value="Отмена" onClick={() => setIsShowEditableCategory(false)}/>
          {errors.categoryEdit && <div className={styles.form__errorMessage}>This field is required</div>}
        </form>
      )}
    </div>
  );
};

export default CategoryEdit;
