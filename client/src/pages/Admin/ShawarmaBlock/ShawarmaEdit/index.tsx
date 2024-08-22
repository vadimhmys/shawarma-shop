import React from 'react';
import ReactLoading from 'react-loading';
import { SubmitHandler, useForm } from 'react-hook-form';
//import { ShawarmaEditPropsType, ShawarmaInputEdit } from '..';
import { updateShawarma } from '../../../../http/catalogAPI';
import styles from '../../Admin.module.scss';
import { ShawarmaEditPropsType } from '..';

type ShawarmaEditFields = {
  name: string;
  title: string;
  image?: File;
  /* icon: File;
  novelty: boolean;
  presence: boolean; */
};

const ShawarmaEdit: React.FC<ShawarmaEditPropsType> = ({
  shawarma,
  setIsShowEditableShawarma,
  isShowEditableShawarma,
}) => {
  const [image, setImage] = React.useState<File>();
  const [fetching, setFetching] = React.useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShawarmaEditFields>({ mode: 'onChange' });
  const onSubmit: SubmitHandler<ShawarmaEditFields> = (data) => {
    setFetching(true);
    const info = new FormData();
    info.append('name', data.name.trim());
    info.append('title', data.title.trim());
    if (image) info.append('image', image);

    updateShawarma(shawarma.id, info)
      .catch((error) => console.log('Не удалось обновить шавуху'))
      .finally(() => {
        setFetching(false);
        setIsShowEditableShawarma(false);
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
      {isShowEditableShawarma && (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <input
            className={styles.form__input}
            defaultValue={shawarma.name}
            {...register('name', { required: true })}
          />
          {errors.name && (
            <div className={styles.form__errorMessage}>Поле обязательно для заполнения</div>
          )}
          <input
            className={styles.form__input}
            defaultValue={shawarma.title}
            {...register('title', { required: true })}
          />
          {errors.title && (
            <div className={styles.form__errorMessage}>Поле обязательно для заполнения</div>
          )}
          <input
            className={styles.form__input}
            {...register('image')}
            type="file"
            onChange={(e) => handleImageChange(e)}
          />
          <input className={styles.form__btn} type="submit" value="Сохранить" />
          <input
            className={styles.form__btn}
            type="button"
            value="Отмена"
            onClick={() => setIsShowEditableShawarma(false)}
          />
        </form>
      )}
    </div>
  );
};

export default ShawarmaEdit;
