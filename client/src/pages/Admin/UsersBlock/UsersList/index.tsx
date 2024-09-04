import React from 'react';
import ReactLoading from 'react-loading';
import { FaRegTrashCan } from 'react-icons/fa6';
import { CiEdit } from 'react-icons/ci';
import { fetchUsers } from '../../../../http/adminAPI';
import { UsersListPropsType, UsersType } from '../types';
import styles from '../../Admin.module.scss';

const UsersList: React.FC<UsersListPropsType> = ({
  setIsShowUsersList,
  setEditableUsers,
  setIsShowEditableUsers,
  setIsShowDeleteQuestion,
  setDeletedUsersIndex,
}) => {
  const [users, setUsers] = React.useState<UsersType[]>([]);
  const [fetching, setFetching] = React.useState(true);

  const handleEditUsers = (id: number, email: string, role: 'ADMIN' | 'USER') => {
    setIsShowUsersList(false);
    setEditableUsers({ id, email, role });
    setIsShowEditableUsers(true);
  };

  const handleDeleteUsers = (id: number) => {
    setIsShowDeleteQuestion(true);
    setDeletedUsersIndex(id);
  };

  React.useEffect(() => {
    fetchUsers()
      .then((data) => setUsers(data))
      .finally(() => setFetching(false));
  }, []);

  if (fetching) {
    return <ReactLoading type={'spin'} color={'red'} height={80} width={80} />;
  }

  return (
    <>
      {users.length > 0 ? (
        <table className={styles.infoBlock__list}>
          <thead>
            <tr>
              <th>Пользователь</th>
              <th>Редактировать</th>
              <th>Удалить</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.email}</td>
                <td>
                  <CiEdit
                    onClick={() => handleEditUsers(u.id, u.email, u.role)}
                    className={styles.listItem__editIcon}
                  />
                </td>
                <td>
                  <FaRegTrashCan
                    onClick={() => handleDeleteUsers(u.id)}
                    className={styles.listItem__trashIcon}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className={styles.infoBlock__emptyList}>Список пользователей пустой</p>
      )}
    </>
  );
};

export default UsersList;
