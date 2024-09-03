import React from 'react';
import { useDispatch } from 'react-redux';
import { addComponent, removeComponent } from '../../redux/shawarma/slice';
import { HiArrowPath } from 'react-icons/hi2';
import { TfiClose } from 'react-icons/tfi';
import styles from './ComponentToRemove.module.scss';

type ComponentToRemovePropsType = {
  children: string;
};

const ComponentToRemove: React.FC<ComponentToRemovePropsType> = ({ children }) => {
  const dispatch = useDispatch();
  const [isRemoved, setIsRemoved] = React.useState(false);

  const onClickRemove = () => {
    dispatch(addComponent(children));
    setIsRemoved(true);
  };

  const onClickInsert = () => {
    dispatch(removeComponent(children));
    setIsRemoved(false);
  };

  return (
    <li className={styles.root}>
      <span className={isRemoved ? `${styles.removed}` : ''}>{children}</span>
      {isRemoved ? (
        <HiArrowPath className={styles.icon} onClick={onClickInsert} />
      ) : (
        <TfiClose className={styles.icon} onClick={onClickRemove} />
      )}
    </li>
  );
};

export default ComponentToRemove;
