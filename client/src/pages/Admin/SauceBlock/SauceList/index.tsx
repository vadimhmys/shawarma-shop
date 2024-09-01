import React from 'react';
import ReactLoading from 'react-loading';
import { FaRegTrashCan } from 'react-icons/fa6';
import { CiEdit } from 'react-icons/ci';
import { fetchSauces } from '../../../../http/sauceAPI';
import { SauceListPropsType, SauceType } from '../types';
import styles from '../../Admin.module.scss';

const SauceList: React.FC<SauceListPropsType> = ({
  setIsShowSauceList,
  setEditableSauce,
  setIsShowEditableSauce,
  setIsShowDeleteQuestion,
  setDeletedSauceIndex,
}) => {
  const [sauces, setSauces] = React.useState<SauceType[]>([]);
  const [fetching, setFetching] = React.useState(true);

  const handleEditSauce = (id: number, name: string, price: number, image: string) => {
    setIsShowSauceList(false);
    setEditableSauce({ id, name, price, image });
    setIsShowEditableSauce(true);
  };

  const handleDeleteSauce = (id: number) => {
    setIsShowDeleteQuestion(true);
    setDeletedSauceIndex(id);
  };

  React.useEffect(() => {
    fetchSauces()
      .then((data) => setSauces(data))
      .finally(() => setFetching(false));
  }, []);

  if (fetching) {
    return <ReactLoading type={'spin'} color={'red'} height={80} width={80} />;
  }

  return (
    <>
      {sauces.length > 0 ? (
        <table className={styles.infoBlock__list}>
          <thead>
            <tr>
              <th>Соус</th>
              <th>Редактировать</th>
              <th>Удалить</th>
            </tr>
          </thead>
          <tbody>
            {sauces.map((s) => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>
                  <CiEdit
                    onClick={() => handleEditSauce(s.id, s.name, s.price, s.image)}
                    className={styles.listItem__editIcon}
                  />
                </td>
                <td>
                  <FaRegTrashCan
                    onClick={() => handleDeleteSauce(s.id)}
                    className={styles.listItem__trashIcon}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className={styles.infoBlock__emptyList}>Список соусов пустой</p>
      )}
    </>
  );
};

export default SauceList;
