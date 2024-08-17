import React from 'react';
import ReactLoading from 'react-loading';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CategoryCreatePropsType, CategoryInputCreate } from '..';
import { createCategory } from '../../../../http/catalogAPI';

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
    <>
      {isShowCreatedCategory && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register('categoryCreate', { required: true })} />
          {errors.categoryCreate && <span>This field is required</span>}
          <input type="submit" value="Создать"/>
        </form>
      )}
    </>
  );
};

export default CategoryCreate;
