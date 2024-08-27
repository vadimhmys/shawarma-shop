import React from 'react';
import ReactLoading from 'react-loading';
import { CardPropertyType } from '../../../../redux/shawarmas/types';
import { FaRegTrashCan } from 'react-icons/fa6';
import { Button } from '../../../../ui-kit';
import { createShawarmaProperty } from '../../../../http/catalogAPI';
import styles from '../../Admin.module.scss';

export type UpdateShawarmaPropertiesPropsType = {
  shawarmaId: number;
  properties: CardPropertyType[];
  setProperties: React.Dispatch<React.SetStateAction<CardPropertyType[]>>;
};

const UpdateShawarmaProperties: React.FC<UpdateShawarmaPropertiesPropsType> = ({
  shawarmaId,
  properties,
  setProperties,
}) => {
  const [fetching, setFetching] = React.useState(false);

  const changeWeight = (id: number, value: number) => {
    setProperties(
      properties.map((item) => {
        if (item.id === id) {
          return { ...item, weight: value };
        } else {
          return item;
        }
      }),
    );
  };

  const changePrice = (id: number, value: string) => {
    setProperties(
      properties.map((item) => {
        if (item.id === id) {
          return { ...item, price: value };
        } else {
          return item;
        }
      }),
    );
  };

  const addProperty = (e: React.MouseEvent<Element, MouseEvent>, shawarmaId: number) => {
    e.preventDefault();
    setFetching(true);
    const property = {
      shawarmaId,
      weight: 0,
      price: 0,
    };
    createShawarmaProperty(property)
      .then((data) => setProperties([...properties, data]))
      .catch((error) => alert("Не удалось создать характеристику!"))
      .finally(() => setFetching(false));
  };

  const removeProperty = (id: number) => {
    setProperties(properties.filter((item) => item.id !== id));
  };

  if (fetching) {
    return <ReactLoading type={'spin'} color={'red'} height={80} width={80} />;
  }

  return (
    <>
      <h4 className={styles.infoBlock__subtitle}>Характеристики</h4>
      <Button handleClick={(e) => addProperty(e, shawarmaId)}>Добавить</Button>
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
            <tr key={item.id}>
              <td>
                <input
                  name={'weight_' + item.id}
                  value={item.weight}
                  onChange={(e) => changeWeight(item.id, +e.target.value)}
                />
              </td>
              <td>
                <input
                  name={'price_' + item.id}
                  value={item.price}
                  onChange={(e) => changePrice(item.id, e.target.value)}
                />
              </td>
              <td>
                <FaRegTrashCan className={styles.listItem__trashIcon} onClick={() => removeProperty(item.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UpdateShawarmaProperties;
