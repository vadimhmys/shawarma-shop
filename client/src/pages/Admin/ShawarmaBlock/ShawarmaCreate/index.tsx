import React from 'react';
/* import ReactLoading from 'react-loading';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ShawarmaCreatePropsType, ShawarmaNameCreate } from '..';
import { createShawarma } from '../../../../http/catalogAPI'; */
import styles from '../../Admin.module.scss';

/* type Inputs = {
  name: string;
  title: string;
} */

const ShawarmaCreationForm: React.FC = (/* {
  setIsShowCreatedShawarma,
  isShowCreatedShawarma,
} */) => {
  /* const [fetching, setFetching] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: 'onChange' });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setFetching(true);
    createShawarma({name: data.name})
      .catch((error) => console.log('Не удалось создать категорию'))
      .finally(() => {
        setFetching(false);
        setIsShowCreatedShawarma(false);
      });
  }; */

  /* if (fetching) {
    return <ReactLoading type={'spin'} color={'red'} height={80} width={80} />;
  } */

  return (
    <div className={styles.formWrapper}>
      {/* {isShowCreatedShawarma && (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <input
            className={styles.form__input}
            {...register('name', { required: true })}
            placeholder="Напишите название категории..."
            maxLength={30}
          />
          <input className={styles.form__btn} type="submit" value="Создать" />
          <input
            className={styles.form__btn}
            type="button"
            value="Отмена"
            onClick={() => setIsShowCreatedShawarma(false)}
          />
          {errors.name && (
            <div className={styles.form__errorMessage}>Поле не должно быть пустым!</div>
          )}
        </form>
      )} */}
      Create shawarma
    </div>
  );
};

export default ShawarmaCreationForm;
