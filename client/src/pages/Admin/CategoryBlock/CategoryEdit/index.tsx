import React from 'react';
import ReactLoading from 'react-loading';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CategoryEditPropsType, CategoryInputEdit } from '..';
import { updateCategory } from '../../../../http/catalogAPI';

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
    <>
      {isShowEditableCategory && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input defaultValue={name} {...register('categoryEdit', { required: true })} />
          {errors.categoryEdit && <span>This field is required</span>}
          <input type="submit" />
        </form>
      )}
    </>
  );
};

export default CategoryEdit;
