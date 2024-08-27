import React from 'react';
import ReactLoading from 'react-loading';
import ReactSelect from 'react-select';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ShawarmaCreatePropsType } from '..';
import { CategoryOptionType } from '../ShawarmaEdit';
import { CategoryType } from '../../CategoryBlock';
import { createShawarma, fetchCategories } from '../../../../http/catalogAPI';
import styles from '../../Admin.module.scss';

export type ShawarmaCreateFields = {
  name: string;
  title: string;
  category: string;
  image: File;
  icon: File;
  novelty: boolean;
  presence: boolean;
};

const ShawarmaCreate: React.FC<ShawarmaCreatePropsType> = ({
  setIsShowCreatedShawarma,
  isShowCreatedShawarma,
}) => {
  const [fetching, setFetching] = React.useState(false);
  const [image, setImage] = React.useState<File>();
  const [icon, setIcon] = React.useState<File>();
  const [options, setOptions] = React.useState<CategoryOptionType[]>([]);
  
  const getValue = React.useCallback(
    (value: number) => (value ? options.find((option) => option.value === value) : 0),
    [options],
  );
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ShawarmaCreateFields>({ mode: 'onChange' });
  const onSubmit: SubmitHandler<ShawarmaCreateFields> = (data) => {
    setFetching(true);
    const shawarma = new FormData();
    shawarma.append('name', data.name.trim());
    shawarma.append('title', data.title.trim());
    if (image) shawarma.append('image', image);
    if (icon) shawarma.append('icon', icon);
    shawarma.append('novelty', data.novelty + '');
    shawarma.append('presence', data.presence + '');
    if (data.category) shawarma.append('categoryId', data.category);
    createShawarma(shawarma)
      .catch((error) => console.log('Не удалось создать шавуху'))
      .finally(() => {
        setFetching(false);
        setIsShowCreatedShawarma(false);
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

  React.useEffect(() => {
    fetchCategories().then((data) => {
      const options = data
        .filter((item: CategoryType) => item.id !== 0 && item.id !== 1)
        .map((item: CategoryType) => ({
          value: item.id,
          label: item.name,
        }));
      setOptions(options);
    });
  }, []);

  if (fetching) {
    return <ReactLoading type={'spin'} color={'red'} height={80} width={80} />;
  }

  return (
    <div className={styles.formWrapper}>
      {isShowCreatedShawarma && (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <label className={styles.form__label} htmlFor="createdShawarmaName">
            Напишите полное название шаурмы!
          </label>
          <input
            id="createdShawarmaName"
            className={styles.form__input}
            {...register('name', { required: true })}
            placeholder="Полное название..."
            maxLength={30}
          />
          {errors.name && (
            <div className={styles.form__errorMessage}>Поле обязательно для заполнения</div>
          )}

          <label className={styles.form__label} htmlFor="createdShawarmaTitle">
            Напишите краткое название шаурмы!
          </label>
          <input
            id="createdShawarmaTitle"
            className={styles.form__input}
            {...register('title', { required: true })}
            placeholder="Краткое название..."
            maxLength={30}
          />
          {errors.title && (
            <div className={styles.form__errorMessage}>Поле обязательно для заполнения</div>
          )}

          <label className={styles.form__label} htmlFor="shawarmaCreateImage">
            Загрузить изображение
          </label>
          <input
            className={styles.form__inputUpload}
            id="shawarmaCreateImage"
            {...register('image', { required: true })}
            type="file"
            onChange={(e) => handleImageChange(e)}
          />
          {errors.image && (
            <div className={styles.form__errorMessage}>Изображение обязательно!</div>
          )}

          <label className={styles.form__label} htmlFor="shawarmaCreateIcon">
            Загрузить иконку
          </label>
          <input
            className={styles.form__inputUpload}
            id="shawarmaCreateIcon"
            {...register('icon', { required: true })}
            type="file"
            onChange={(e) => handleIconChange(e)}
          />
          {errors.icon && (
            <div className={styles.form__errorMessage}>Иконка обязательна!</div>
          )}

          <label className={styles.form__label} htmlFor="shawarmaCreateNovelty">
            Новинка?
          </label>
          <input
            className={styles.form__checkbox}
            id="shawarmaCreateNovelty"
            defaultChecked={false}
            {...register('novelty')}
            type="checkbox"
          />

          <label className={styles.form__label} htmlFor="shawarmaCreatePresence">
            В наличии?
          </label>
          <input
            className={styles.form__checkbox}
            id="shawarmaCreatePresence"
            defaultChecked={true}
            {...register('presence')}
            type="checkbox"
          />

          <Controller
            control={control}
            name="category"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <div>
                <div className={styles.form__label}>
                  Выберите категорию
                </div>
                <ReactSelect
                  placeholder="Категории..."
                  options={options}
                  value={getValue(+value)}
                  onChange={(newValue) => onChange((newValue as CategoryOptionType).value)}
                />
                {error && <div style={{ color: 'red' }}>{error.message}</div>}
              </div>
            )}
          />

          <input className={styles.form__btn} type="submit" value="Создать" />
          <input
            className={styles.form__btn}
            type="button"
            value="Отмена"
            onClick={() => setIsShowCreatedShawarma(false)}
          />
        </form>
      )}
    </div>
  );
};

export default ShawarmaCreate;
