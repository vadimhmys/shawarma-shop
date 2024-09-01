import React from 'react';
import ReactLoading from 'react-loading';
import { deleteSauce } from '../../../../http/sauceAPI';
import { SauceDeletePropsType } from '../types';
import styles from '../../Admin.module.scss';

const SauceDelete: React.FC<SauceDeletePropsType> = ({
  id,
  setIsShowDeleteQuestion,
  setIsShowSauceList,
}) => {
  const [fetching, setFetching] = React.useState(false);

  const handleDelete = () => {
    setIsShowDeleteQuestion(false);
    setIsShowSauceList(false);
    setFetching(true);
    deleteSauce(id)
      .catch((error) => console.log('Не удалось удалить соус'))
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
        <h2 className={styles.modalWin__header}>Вы уверены, что хотите удалить соус?</h2>
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

export default SauceDelete;
