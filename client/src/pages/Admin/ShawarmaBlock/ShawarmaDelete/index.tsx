import React from 'react';
/* import ReactLoading from 'react-loading';
import { deleteShawarma } from '../../../../http/catalogAPI';
import { ShawarmaDeletePropsType } from '..'; */
import styles from '../../Admin.module.scss';

const ShawarmaDelete: React.FC = (/* {
  id,
  setIsShowDeleteQuestion,
  setIsShowShawarmaList,
} */) => {
  /* const [fetching, setFetching] = React.useState(false);
 */
  /* const handleDelete = () => {
    setIsShowDeleteQuestion(false);
    setIsShowShawarmaList(false);
    setFetching(true);
    deleteShawarma(id)
      .catch((error) => console.log('Не удалось удалить категорию'))
      .finally(() => setFetching(false));
  }; */

  /* const handleCancel = () => {
    setIsShowDeleteQuestion(false);
  }; */

  /* if (fetching) {
    return <ReactLoading type={'spin'} color={'red'} height={80} width={80} />;
  } */

  return (
    <div className={styles.modalWin}>
      {/* <div>
        <h2 className={styles.modalWin__header}>Вы уверены, что хотите удалить категорию?</h2>
        <p className={styles.modalWin__warning}>
          Вместе с категорией удалятся все шавухи, относящиеся к ней!
        </p>
        <div className={styles.modalWin__btnBlock}>
          <button className={styles.modalWin__btn} onClick={handleDelete}>
            Да
          </button>
          <button className={styles.modalWin__btn} onClick={handleCancel}>
            Нет
          </button>
        </div>
      </div> */}
      delete shawarma
    </div>
  );
};

export default ShawarmaDelete;