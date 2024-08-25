import React from 'react';
import ReactLoading from 'react-loading';
import { SubmitHandler, useForm } from 'react-hook-form';
//import { ShawarmaEditPropsType, ShawarmaInputEdit } from '..';
import { updateShawarma } from '../../../../http/catalogAPI';
import { ShawarmaEditPropsType } from '..';
import styles from '../../Admin.module.scss';

type ShawarmaEditFields = {
  name: string;
  title: string;
  image?: File;
  icon?: File;
  novelty?: boolean;
  presence?: boolean;
};

const ShawarmaEdit: React.FC<ShawarmaEditPropsType> = ({
  shawarma,
  setIsShowEditableShawarma,
  isShowEditableShawarma,
}) => {
  const [image, setImage] = React.useState<File>();
  const [icon, setIcon] = React.useState<File>();
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
    if (icon) info.append('icon', icon);
    info.append('novelty', data.novelty + '');
    info.append('presence', data.presence + '');

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

  const handleIconChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target) {
      setIcon(event.target.files?.[0]);
    }
  };

  if (fetching) {
    return <ReactLoading type={'spin'} color={'red'} height={80} width={80} />;
  }

  return (
    <div className={styles.formWrapper}>
      {isShowEditableShawarma && (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <label className={styles.form__label} htmlFor="shawarmaName">
            Редактировать полное название
          </label>
          <input
            className={styles.form__input}
            id="shawarmaName"
            defaultValue={shawarma.name}
            {...register('name', { required: true })}
          />
          {errors.name && (
            <div className={styles.form__errorMessage}>Поле обязательно для заполнения</div>
          )}
          <label className={styles.form__label} htmlFor="shawarmaTitle">
            Редактировать краткое название
          </label>
          <input
            className={styles.form__input}
            id="shawarmaTitle"
            defaultValue={shawarma.title}
            {...register('title', { required: true })}
          />
          {errors.title && (
            <div className={styles.form__errorMessage}>Поле обязательно для заполнения</div>
          )}
          <label className={styles.form__label} htmlFor="shawarmaImage">
            Загрузить изображение
          </label>
          <input
            className={styles.form__inputUpload}
            id="shawarmaImage"
            {...register('image')}
            type="file"
            onChange={(e) => handleImageChange(e)}
          />
          <label className={styles.form__label} htmlFor="shawarmaIcon">
            Загрузить иконку
          </label>
          <input
            className={styles.form__inputUpload}
            id="shawarmaIcon"
            {...register('icon')}
            type="file"
            onChange={(e) => handleIconChange(e)}
          />
          <label className={styles.form__label} htmlFor="shawarmaNovelty">
            Новинка?
          </label>
          <input
            className={styles.form__checkbox}
            id="shawarmaNovelty"
            defaultChecked={shawarma.novelty}
            {...register('novelty')}
            type="checkbox"
          />
          <label className={styles.form__label} htmlFor="shawarmaPresence">
            В наличии?
          </label>
          <input
            className={styles.form__checkbox}
            id="shawarmaPresence"
            defaultChecked={shawarma.presence}
            {...register('presence')}
            type="checkbox"
          />
          <div className={styles.form__btnsWrapper}>
            <input className={styles.form__btn} type="submit" value="Сохранить" />
            <input
              className={styles.form__btn}
              type="button"
              value="Отмена"
              onClick={() => setIsShowEditableShawarma(false)}
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default ShawarmaEdit;
