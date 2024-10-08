import React from 'react';
import uuid from 'react-uuid';
import { FaRegTrashCan } from 'react-icons/fa6';
import { Button } from '../../../../ui-kit';
import { CreateShawarmaPropertiesPropsType } from '../types';
import styles from '../../Admin.module.scss';

const CreateShawarmaProperties: React.FC<CreateShawarmaPropertiesPropsType> = ({
  properties,
  setProperties,
}) => {
  const changeWeight = (unique: string, value: number) => {
    setProperties(
      properties.map((item) => {
        if (item.unique === unique) {
          return { ...item, weight: value };
        } else {
          return item;
        }
      }),
    );
  };

  const changePrice = (unique: string, value: string) => {
    setProperties(
      properties.map((item) => {
        if (item.unique === unique) {
          return { ...item, price: value };
        } else {
          return item;
        }
      }),
    );
  };

  const addProperty = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault();
    const property = {
      weight: 0,
      price: '0.0',
      unique: uuid(),
    };
    setProperties([...properties, property]);
  };

  const removeProperty = (unique: string) => {
    setProperties(properties.filter((item) => item.unique !== unique));
  };

  return (
    <>
      <h4 className={styles.infoBlock__subtitle}>Характеристики</h4>
      <Button handleClick={addProperty}>Добавить</Button>
      {properties.length === 0 ? (
        <p className={styles.emptyPropertyMessage}>Характеристики не заданы!</p>
      ) : (
        <table className={styles.infoBlock__list}>
          <thead>
            <tr>
              <th>Вес</th>
              <th>Цена</th>
              <th>Удалить</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((item) => (
              <tr key={item.unique}>
                <td>
                  <input
                    name={'weight_' + item.unique}
                    value={item.weight}
                    onChange={(e) => changeWeight(item.unique, +e.target.value)}
                  />
                </td>
                <td>
                  <input
                    name={'price_' + item.unique}
                    value={item.price}
                    onChange={(e) => changePrice(item.unique, e.target.value)}
                  />
                </td>
                <td>
                  <FaRegTrashCan
                    className={styles.listItem__trashIcon}
                    onClick={() => removeProperty(item.unique)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default CreateShawarmaProperties;
