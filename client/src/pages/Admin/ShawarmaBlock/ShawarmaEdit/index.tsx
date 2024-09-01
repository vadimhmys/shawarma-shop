import React from 'react';
import ReactLoading from 'react-loading';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { updateShawarma } from '../../../../http/shawarmaAPI';
import { fetchCategories } from '../../../../http/categoryAPI';
import UpdateShawarmaProperties from '../UpdateShawarmaProperties';
import ReactSelect from 'react-select';
import { CategoryType } from '../../CategoryBlock/types';
import UpdateShawarmaComponents from '../UpdateShawarmaComponents';
import { CategoryOptionType, ShawarmaEditFields, ShawarmaEditPropsType } from '../types';
import styles from '../../Admin.module.scss';

const ShawarmaEdit: React.FC<ShawarmaEditPropsType> = ({
  shawarma,
  setIsShowEditableShawarma,
  isShowEditableShawarma,
}) => {
  const [image, setImage] = React.useState<File>();
  const [icon, setIcon] = React.useState<File>();
  const [fetching, setFetching] = React.useState(false);
  const [properties, setProperties] = React.useState(shawarma.props);
  const [components, setComponents] = React.useState(shawarma.components);
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
    if (data.category) info.append('categoryId', data.category);
    info.append('props', JSON.stringify(properties));
    info.append('components', JSON.stringify(components));

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
          <Controller
            control={control}
            name="category"
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <div>
                <div className={styles.form__label}>Выберите категорию</div>
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
          <UpdateShawarmaProperties
            shawarmaId={shawarma.id}
            properties={properties}
            setProperties={setProperties}
          />
          <UpdateShawarmaComponents
            shawarmaId={shawarma.id}
            components={components}
            setComponents={setComponents}
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
