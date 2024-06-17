import React from 'react';

import Counter from '../../components/Counter';
import { FaRegTrashCan } from "react-icons/fa6";

import styles from './Basket.module.scss';

export default function Basket() {
  return (
    <div className={styles.root}>
      <h2 className={styles.title}>Корзина</h2>
      <ul className={styles.list}>
        <li className={styles.list__item}>
          <div className={styles.image}>
            <img src="/images/doner-chiken.webp" alt="Doner chiken" />
          </div>
          <div className={styles.content}>
            <h3>Донер Чикен</h3>
            <div className={styles.info}>
              <span>300 г.</span>
              <span>Лепешка</span>
            </div>
            <ul className={styles.added__list}>
              Добавлено: &nbsp;
              <li className={styles.added__item}>
                Сыр(1)
              </li>
              <li className={styles.added__item}>
                Корейская морковь(2)
              </li>
            </ul>
            <ul className={styles.removed__list}>
              Удалено: &nbsp;
              <li className={styles.removed__item}>
                Помидор
              </li>
            </ul>
          </div>
          <Counter price="100" maxCount={10} />
          <div className={styles.sum}>15.90 р.</div>
          <FaRegTrashCan className={styles.trash}/>
        </li>
        <hr/>
        <li className={styles.list__item}>
          <div className={styles.image}>
            <img src="/images/doner-chiken.webp" alt="Doner chiken" />
          </div>
          <div className={styles.content}>
            <h3>Донер Чикен</h3>
            <div className={styles.info}>
              <span>300 г.</span>
              <span>Лепешка</span>
            </div>
            <ul className={styles.added__list}>
              Добавлено: &nbsp;
              <li className={styles.added__item}>
                Сыр(1)
              </li>
              <li className={styles.added__item}>
                Корейская морковь(2)
              </li>
              <li className={styles.added__item}>
                Красный соус(1)
              </li>
              <li className={styles.added__item}>
                Сырный соус(1)
              </li>
            </ul>
            <ul className={styles.removed__list}>
              Удалено: &nbsp;
              <li className={styles.removed__item}>
                Помидор
              </li>
              <li className={styles.removed__item}>
                Маринованный огурец
              </li>
            </ul>
          </div>
          <Counter price="100" maxCount={10} />
          <div className={styles.sum}>15.90 р.</div>
          <FaRegTrashCan className={styles.trash}/>
        </li>
        <hr/>
      </ul>
    </div>
  );
}
