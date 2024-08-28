import React from 'react';
import ReactLoading from 'react-loading';
import { FaRegTrashCan } from 'react-icons/fa6';
import { CiEdit } from 'react-icons/ci';
import { fetchShawarmas } from '../../../../http/catalogAPI';
import { ShawarmaType } from '../../../../redux/shawarmas/types';
import { ShawarmaListPropsType } from '..';
import styles from '../../Admin.module.scss';

const ShawarmaList: React.FC<ShawarmaListPropsType> = ({
  setIsShowShawarmaList,
  setEditableShawarma,
  setIsShowEditableShawarma,
  setIsShowDeleteQuestion,
  setDeletedShawarmaIndex,
}) => {
  const [shawarmas, setShawarmas] = React.useState<ShawarmaType[]>([]);
  const [fetching, setFetching] = React.useState(true);

  const handleEditShawarma = (shawarma: ShawarmaType) => {
    setIsShowShawarmaList(false);
    setEditableShawarma(shawarma);
    setIsShowEditableShawarma(true);
  };

  const handleDeleteShawarma = (id: number) => {
    setIsShowDeleteQuestion(true);
    setDeletedShawarmaIndex(id);
  };

  React.useEffect(() => {
    fetchShawarmas()
      .then((data) => setShawarmas(data))
      .finally(() => setFetching(false));
  }, []);

  if (fetching) {
    return <ReactLoading type={'spin'} color={'red'} height={80} width={80} />;
  }

  return (
    <>
      {shawarmas.length > 0 ? (
        <table className={styles.infoBlock__list}>
          <thead>
            <tr>
              <th>Шавуха</th>
              <th>Редактировать</th>
              <th>Удалить</th>
            </tr>
          </thead>
          <tbody>
            {shawarmas.map((s) => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>
                  <CiEdit
                    onClick={() => handleEditShawarma(s)}
                    className={styles.listItem__editIcon}
                  />
                </td>
                <td>
                  <FaRegTrashCan
                    onClick={() => handleDeleteShawarma(s.id)}
                    className={styles.listItem__trashIcon}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className={styles.infoBlock__emptyList}>Список шавух пустой</p>
      )}
    </>
  );
};

export default ShawarmaList;
