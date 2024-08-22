import React from 'react';
/* import ReactLoading from 'react-loading';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ShawarmaEditPropsType, ShawarmaInputEdit } from '..';
import { updateShawarma } from '../../../../http/catalogAPI'; */
import styles from '../../Admin.module.scss';

const ShawarmaEdit: React.FC = (/* {
  id,
  name,
  setIsShowEditableShawarma,
  isShowEditableShawarma,
} */) => {
  /* const [fetching, setFetching] = React.useState(false); */
  /* const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShawarmaInputEdit>({ mode: 'onChange' });
  const onSubmit: SubmitHandler<ShawarmaInputEdit> = (data) => {
    setFetching(true);
    updateShawarma(id, data.ShawarmaEdit)
      .catch((error) => console.log('Не удалось обновить категорию'))
      .finally(() => {
        setFetching(false);
        setIsShowEditableShawarma(false);
      });
  }; */

  /* if (fetching) {
    return <ReactLoading type={'spin'} color={'red'} height={80} width={80} />;
  } */

  return (
    <div className={styles.formWrapper}>
      {/* {isShowEditableShawarma && (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <input
            className={styles.form__input}
            defaultValue={name}
            {...register('ShawarmaEdit', { required: true })}
          />
          <input className={styles.form__btn} type="submit" value="Сохранить" />
          <input
            className={styles.form__btn}
            type="button"
            value="Отмена"
            onClick={() => setIsShowEditableShawarma(false)}
          />
          {errors.ShawarmaEdit && (
            <div className={styles.form__errorMessage}>This field is required</div>
          )}
        </form>
      )} */}
      Edit shawarma
    </div>
  );
};

export default ShawarmaEdit;
