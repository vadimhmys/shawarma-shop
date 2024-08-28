import React from 'react';
import uuid from 'react-uuid';
import { FaRegTrashCan } from 'react-icons/fa6';
import { Button } from '../../../../ui-kit';
import { ComponentType } from '../ShawarmaCreate';
import styles from '../../Admin.module.scss';

export type CreateShawarmaComponentsPropsType = {
  components: ComponentType[];
  setComponents: React.Dispatch<React.SetStateAction<ComponentType[]>>;
};

const CreateShawarmaComponents: React.FC<CreateShawarmaComponentsPropsType> = ({
  components,
  setComponents,
}) => {
  const changeName = (unique: string, value: string) => {
    setComponents(
      components.map((item) => {
        if (item.unique === unique) {
          return { ...item, name: value };
        } else {
          return item;
        }
      }),
    );
  };

  const changeNecessity = (unique: string, value: boolean) => {
    setComponents(
      components.map((item) => {
        if (item.unique === unique) {
          return { ...item, necessity: value };
        } else {
          return item;
        }
      }),
    );
  };

  const addComponent = (e: React.MouseEvent<Element, MouseEvent>) => {
    e.preventDefault();
    const component = {
      name: '',
      necessity: true,
      unique: uuid(),
    };
    setComponents([...components, component]);
  };

  const removeComponent = (unique: string) => {
    setComponents(components.filter((item) => item.unique !== unique));
  };

  return (
    <>
      <h4 className={styles.infoBlock__subtitle}>Компоненты</h4>
      <Button handleClick={addComponent}>Добавить</Button>
      {components.length === 0 ? (
        <p className={styles.emptyPropertyMessage}>Компоненты отсутствуют!</p>
      ) : (
        <table className={styles.infoBlock__list}>
          <thead>
            <tr>
              <th>Название</th>
              <th>
                Нельзя <br /> исключить
              </th>
              <th>Удалить</th>
            </tr>
          </thead>
          <tbody>
            {components.map((item) => (
              <tr key={item.unique}>
                <td>
                  <input
                    name={'name_' + item.unique}
                    value={item.name}
                    onChange={(e) => changeName(item.unique, e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    name={'necessity_' + item.unique}
                    checked={item.necessity}
                    onChange={(e) => changeNecessity(item.unique, e.target.checked)}
                  />
                </td>
                <td>
                  <FaRegTrashCan
                    className={styles.listItem__trashIcon}
                    onClick={() => removeComponent(item.unique)}
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

export default CreateShawarmaComponents;
