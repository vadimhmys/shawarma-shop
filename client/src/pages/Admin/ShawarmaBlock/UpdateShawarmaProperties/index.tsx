import React from 'react';
import { CardPropertyType } from '../../../../redux/shawarmas/types';
import { FaRegTrashCan } from 'react-icons/fa6';
import { Button } from '../../../../ui-kit';

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

  const changeWeight = (id: number, value: number) => {
    setProperties(properties.map((item) => {
      if (item.id === id) {
        return {...item, weight: value};
      } else {
        return item;
      }
    }));
  };

  const changePrice = (id: number, value: string) => {
    setProperties(properties.map((item) => {
      if (item.id === id) {
        return {...item, price: value};
      } else {
        return item;
      }
    }));
  };

  const addProperty = (shawarmaId: number) => {
    const data = {
      id: shawarmaId,
      weight: 0,
      price: '',
    };
    console.log(data);
  }

  return (
    <>
      <h4>Характеристики</h4>
      <Button handleClick={() => addProperty(shawarmaId)}>Добавить</Button>
      <table>
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
                <FaRegTrashCan onClick={() => alert('Remove item')} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UpdateShawarmaProperties;
