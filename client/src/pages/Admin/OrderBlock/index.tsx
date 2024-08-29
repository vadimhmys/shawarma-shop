import React from 'react';
import clsx from 'clsx';
import styles from '../Admin.module.scss';
import { Button } from '../../../ui-kit';

const OrderBlock: React.FC = () => {
  const [isShowOrderList, setIsShowOrderList] = React.useState(false);
  return (
    <div className={clsx(`${styles.infoBlock}`, `${styles.order}`)}>
      <h3 className={styles.infoBlock__title}>Заказы</h3>
      <div className={styles.infoBlock__content}>
        <Button handleClick={() => setIsShowOrderList(!isShowOrderList)}>
          {isShowOrderList ? 'Скрыть' : 'Показать'} список
        </Button>
        {isShowOrderList && (
          <span>Orders list</span>
        )}
      </div>
    </div>
  );
};

export default OrderBlock;
