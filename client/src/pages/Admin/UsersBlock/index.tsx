import React from 'react';
import { Button } from '../../../ui-kit';
import UsersList from './UsersList';
import UsersEdit from './UsersEdit';
import UsersDelete from './UsersDelete';
import UsersCreate from './UsersCreate';
import { UsersType } from './types';
import styles from '../Admin.module.scss';

const UsersBlock: React.FC = () => {
  const [isShowUsersList, setIsShowUsersList] = React.useState(false);
  const [editableUsers, setEditableUsers] = React.useState<UsersType>({
    id: 0,
    email: '',
    role: 'USER',
  });
  const [isShowEditableUsers, setIsShowEditableUsers] = React.useState(false);
  const [deletedUsersIndex, setDeletedUsersIndex] = React.useState(0);
  const [isShowDeleteQuestion, setIsShowDeleteQuestion] = React.useState(false);
  const [isShowCreatedUsers, setIsShowCreatedUsers] = React.useState(false);

  const toggleShowingUserss = () => {
    if (isShowEditableUsers) return;
    if (isShowCreatedUsers) return;
    setIsShowUsersList(!isShowUsersList);
  };

  const handleCreatingUsers = () => {
    if (isShowEditableUsers) return;
    setIsShowUsersList(false);
    setIsShowEditableUsers(false);
    setIsShowCreatedUsers(true);
  };

  return (
    <div className={styles.infoBlock}>
      <h3 className={styles.infoBlock__title}>Пользователи</h3>
      <div className={styles.infoBlock__content}>
        <div className={styles.infoBlock__btnsBlock}>
          <Button handleClick={toggleShowingUserss}>
            {isShowUsersList ? 'Скрыть' : 'Показать'} список
          </Button>
          <Button handleClick={handleCreatingUsers}>Новый пользователь</Button>
        </div>
        {isShowUsersList && (
          <UsersList
            setIsShowUsersList={setIsShowUsersList}
            setEditableUsers={setEditableUsers}
            setIsShowEditableUsers={setIsShowEditableUsers}
            setIsShowDeleteQuestion={setIsShowDeleteQuestion}
            setDeletedUsersIndex={setDeletedUsersIndex}
          />
        )}
        {isShowEditableUsers && (
          <UsersEdit
            users={editableUsers}
            setIsShowEditableUsers={setIsShowEditableUsers}
            isShowEditableUsers={isShowEditableUsers}
          />
        )}
        {isShowDeleteQuestion && (
          <UsersDelete
            id={deletedUsersIndex}
            setIsShowDeleteQuestion={setIsShowDeleteQuestion}
            setIsShowUsersList={setIsShowUsersList}
          />
        )}
        {isShowCreatedUsers && (
          <UsersCreate
            setIsShowCreatedUsers={setIsShowCreatedUsers}
            isShowCreatedUsers={isShowCreatedUsers}
          />
        )}
      </div>
    </div>
  );
};

export default UsersBlock;
