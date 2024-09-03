import React from 'react';
import clsx from 'clsx';
import { Button } from '../../../ui-kit';
import SauceList from './SauceList';
import SauceEdit from './SauceEdit';
import SauceDelete from './SauceDelete';
import SauceCreate from './SauceCreate';
import { SauceType } from './types';
import styles from '../Admin.module.scss';

const SauceBlock: React.FC = () => {
  const [isShowSauceList, setIsShowSauceList] = React.useState(false);
  const [editableSauce, setEditableSauce] = React.useState<SauceType>({
    id: 0,
    name: '',
    price: 0,
    image: '',
  });
  const [isShowEditableSauce, setIsShowEditableSauce] = React.useState(false);
  const [deletedSauceIndex, setDeletedSauceIndex] = React.useState(0);
  const [isShowDeleteQuestion, setIsShowDeleteQuestion] = React.useState(false);
  const [isShowCreatedSauce, setIsShowCreatedSauce] = React.useState(false);

  const toggleShowingSauces = () => {
    if (isShowEditableSauce) return;
    if (isShowCreatedSauce) return;
    setIsShowSauceList(!isShowSauceList);
  };

  const handleCreatingSauce = () => {
    if (isShowEditableSauce) return;
    setIsShowSauceList(false);
    setIsShowEditableSauce(false);
    setIsShowCreatedSauce(true);
  };

  return (
    <div className={clsx(`${styles.infoBlock}`, `${styles.Sauce}`)}>
      <h3 className={styles.infoBlock__title}>Соусы</h3>
      <div className={styles.infoBlock__content}>
        <div className={styles.infoBlock__btnsBlock}>
          <Button handleClick={toggleShowingSauces}>
            {isShowSauceList ? 'Скрыть' : 'Показать'} список
          </Button>
          <Button handleClick={handleCreatingSauce}>Новый соус</Button>
        </div>
        {isShowSauceList && (
          <SauceList
            setIsShowSauceList={setIsShowSauceList}
            setEditableSauce={setEditableSauce}
            setIsShowEditableSauce={setIsShowEditableSauce}
            setIsShowDeleteQuestion={setIsShowDeleteQuestion}
            setDeletedSauceIndex={setDeletedSauceIndex}
          />
        )}
        {isShowEditableSauce && (
          <SauceEdit
            sauce={editableSauce}
            setIsShowEditableSauce={setIsShowEditableSauce}
            isShowEditableSauce={isShowEditableSauce}
          />
        )}
        {isShowDeleteQuestion && (
          <SauceDelete
            id={deletedSauceIndex}
            setIsShowDeleteQuestion={setIsShowDeleteQuestion}
            setIsShowSauceList={setIsShowSauceList}
          />
        )}
        {isShowCreatedSauce && (
          <SauceCreate
            setIsShowCreatedSauce={setIsShowCreatedSauce}
            isShowCreatedSauce={isShowCreatedSauce}
          />
        )}
      </div>
    </div>
  );
};

export default SauceBlock;
