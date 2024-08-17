import React from 'react';
import ReactLoading from 'react-loading';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CategoryEditPropsType, CategoryInput } from '..';
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
  } = useForm<CategoryInput>({ mode: 'onChange' });
  const onSubmit: SubmitHandler<CategoryInput> = (data) => {
    setFetching(true);
    updateCategory(id, data.category)
      .catch((error) => console.log('не удалось обновить катнгорию'))
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
          <input defaultValue={name} {...register('category', { required: true })} />
          {errors.category && <span>This field is required</span>}
          <input type="submit" />
        </form>
      )}
    </>
  );
};

export default CategoryEdit;
