import React from 'react';
import ReactLoading from 'react-loading';
import { deleteUser } from '../../../../http/adminAPI';
import { UsersDeletePropsType } from '../types';
import styles from '../../Admin.module.scss';

const UsersDelete: React.FC<UsersDeletePropsType> = ({
  id,
  setIsShowDeleteQuestion,
  setIsShowUsersList,
}) => {
  const [fetching, setFetching] = React.useState(false);

  const handleDelete = () => {
    setIsShowDeleteQuestion(false);
    setIsShowUsersList(false);
    setFetching(true);
    deleteUser(id)
      .catch((error) => console.log('Не удалось удалить пользователя'))
      .finally(() => setFetching(false));
  };

  const handleCancel = () => {
    setIsShowDeleteQuestion(false);
  };

  if (fetching) {
    return <ReactLoading type={'spin'} color={'red'} height={80} width={80} />;
  }

  return (
    <div className={styles.modalWin}>
      <div>
        <h2 className={styles.modalWin__header}>Вы уверены, что хотите удалить пользователя?</h2>
        <p className={styles.modalWin__warning}>
          Вместе с пользователеми удалятся все его заказы и корзина!
        </p>
        <div className={styles.modalWin__btnBlock}>
          <button className={styles.modalWin__btn} onClick={handleDelete}>
            Да
          </button>
          <button className={styles.modalWin__btn} onClick={handleCancel}>
            Нет
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersDelete;
