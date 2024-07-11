import React from 'react';
import { FaRegTrashCan } from 'react-icons/fa6';
import Counter from '../../../components/Counter';

import styles from './BasketItem.module.scss';

export default function BasketItem({
  id,
  image,
  title,
  weight,
  cake,
  price,
  count,
  addedComponentsList,
}) {
  const uniqueId = id + cake + weight + JSON.stringify(addedComponentsList);
  return (
    <>
      <li className={styles.list__item}>
        <div className={styles.image}>
          <img src={`http://localhost:7000/${image}`} alt={title} />
        </div>
        <div className={styles.content}>
          <h3>{title}</h3>
          <div className={styles.info}>
            <span>{weight} г.</span>
            <span>{cake}</span>
          </div>
          {addedComponentsList.length !== 0 && (
            <ul className={styles.added__list}>
              Добавлено: &nbsp;
              {addedComponentsList.map((component) => (
                <li key={component.id} className={styles.added__item}>
                  {component.name}({component.count})
                </li>
              ))}
            </ul>
          )}
          <ul className={styles.removed__list}>
            Удалено: &nbsp;
            <li className={styles.removed__item}>Помидор</li>
          </ul>
        </div>
        <Counter maxCount={10} initialValue={count} uniqueId={uniqueId} />
        <div className={styles.sum}>{price} р.</div>
        <FaRegTrashCan className={styles.trash} />
      </li>
      <hr />
    </>
  );
}
