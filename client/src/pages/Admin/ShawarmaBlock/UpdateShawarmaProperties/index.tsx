import React from 'react';
import { CardPropertyType } from '../../../../redux/shawarmas/types';
import { FaRegTrashCan } from 'react-icons/fa6';

export type UpdateShawarmaPropertiesPropsType = {
  properties: CardPropertyType[];
  setProperties: React.Dispatch<React.SetStateAction<CardPropertyType[]>>;
};

const UpdateShawarmaProperties: React.FC<UpdateShawarmaPropertiesPropsType> = ({
  properties,
  setProperties,
}) => {
  return (
    <>
      <h4>Характеристики</h4>
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
                  onChange={() => alert('Change weight')}
                />
              </td>
              <td>
                <input
                  name={'price_' + item.id}
                  value={item.price}
                  onChange={() => alert('Change price')}
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
