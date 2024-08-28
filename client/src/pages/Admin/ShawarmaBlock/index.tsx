import React from 'react';
import clsx from 'clsx';
import { ShawarmaType } from '../../../redux/shawarmas/types';
import { Button } from '../../../ui-kit';
import ShawarmaList from './ShawarmaList';
import ShawarmaEdit from './ShawarmaEdit';
import ShawarmaCreate from './ShawarmaCreate';
import ShawarmaDelete from './ShawarmaDelete';
import styles from '../Admin.module.scss';

export type ShawarmaListPropsType = {
  setIsShowShawarmaList: React.Dispatch<React.SetStateAction<boolean>>;
  setEditableShawarma: React.Dispatch<React.SetStateAction<ShawarmaType>>;
  setIsShowEditableShawarma: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowDeleteQuestion: React.Dispatch<React.SetStateAction<boolean>>;
  setDeletedShawarmaIndex: React.Dispatch<React.SetStateAction<number>>;
};

export type ShawarmaEditPropsType = {
  shawarma: ShawarmaType;
  setIsShowEditableShawarma: React.Dispatch<React.SetStateAction<boolean>>;
  isShowEditableShawarma: boolean;
};

export type ShawarmaDeletePropsType = {
  id: number;
  setIsShowDeleteQuestion: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowShawarmaList: React.Dispatch<React.SetStateAction<boolean>>;
};

export type ShawarmaCreatePropsType = {
  setIsShowCreatedShawarma: React.Dispatch<React.SetStateAction<boolean>>;
  isShowCreatedShawarma: boolean;
};

const ShawarmaBlock: React.FC = () => {
  const [isShowShawarmaList, setIsShowShawarmaList] = React.useState(false);
  const [editableShawarma, setEditableShawarma] = React.useState<ShawarmaType>({
    id: 0,
    name: '',
    title: '',
    categoryId: 0,
    icon: '',
    image: '',
    novelty: true,
    presence: true,
    props: [],
    components: [],
    createdAt: '',
    updatedAt: '',
  });
  const [isShowEditableShawarma, setIsShowEditableShawarma] = React.useState(false);
  const [deletedShawarmaIndex, setDeletedShawarmaIndex] = React.useState(0);
  const [isShowDeleteQuestion, setIsShowDeleteQuestion] = React.useState(false);
  const [isShowCreatedShawarma, setIsShowCreatedShawarma] = React.useState(false);

  const toggleShowingShawarmas = () => {
    if (isShowEditableShawarma) setIsShowEditableShawarma(false);
    if (isShowCreatedShawarma) setIsShowCreatedShawarma(false);
    setIsShowShawarmaList(!isShowShawarmaList);
  };

  const handleCreatingShawarma = () => {
    if (isShowEditableShawarma) return;
    setIsShowShawarmaList(false);
    setIsShowEditableShawarma(false);
    setIsShowCreatedShawarma(true);
  };

  return (
    <div className={clsx(`${styles.infoBlock}`, `${styles.Shawarma}`)}>
      <h3 className={styles.infoBlock__title}>Шавухи</h3>
      <div className={styles.infoBlock__content}>
        <div className={styles.infoBlock__btnsBlock}>
          <Button handleClick={toggleShowingShawarmas}>
            {isShowShawarmaList ? 'Скрыть' : 'Показать'} список
          </Button>
          <Button handleClick={handleCreatingShawarma}>Новая шавуха</Button>
        </div>
        {isShowShawarmaList && (
          <ShawarmaList
            setIsShowShawarmaList={setIsShowShawarmaList}
            setEditableShawarma={setEditableShawarma}
            setIsShowEditableShawarma={setIsShowEditableShawarma}
            setIsShowDeleteQuestion={setIsShowDeleteQuestion}
            setDeletedShawarmaIndex={setDeletedShawarmaIndex}
          />
        )}
        {isShowEditableShawarma && (
          <ShawarmaEdit
            shawarma={editableShawarma}
            setIsShowEditableShawarma={setIsShowEditableShawarma}
            isShowEditableShawarma={isShowEditableShawarma}
          />
        )}
        {isShowDeleteQuestion && (
          <ShawarmaDelete
            id={deletedShawarmaIndex}
            setIsShowDeleteQuestion={setIsShowDeleteQuestion}
            setIsShowShawarmaList={setIsShowShawarmaList}
          />
        )}
        {isShowCreatedShawarma && (
          <ShawarmaCreate
            setIsShowCreatedShawarma={setIsShowCreatedShawarma}
            isShowCreatedShawarma={isShowCreatedShawarma}
          />
        )}
      </div>
    </div>
  );
};

export default ShawarmaBlock;
