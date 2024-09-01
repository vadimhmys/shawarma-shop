import React from 'react';
import ReactLoading from 'react-loading';
import { FaRegTrashCan } from 'react-icons/fa6';
import { Button } from '../../../../ui-kit';
import { createShawarmaComponent } from '../../../../http/shawarmaAPI';
import { UpdateShawarmaComponentsPropsType } from '../types';
import styles from '../../Admin.module.scss';

const UpdateShawarmaComponents: React.FC<UpdateShawarmaComponentsPropsType> = ({
  shawarmaId,
  components,
  setComponents,
}) => {
  const [fetching, setFetching] = React.useState(false);

  const changeName = (id: number, value: string) => {
    setComponents(
      components.map((item) => {
        if (item.id === id) {
          return { ...item, name: value };
        } else {
          return item;
        }
      }),
    );
  };

  const changeNecessity = (id: number, value: boolean) => {
    setComponents(
      components.map((item) => {
        if (item.id === id) {
          return { ...item, necessity: value };
        } else {
          return item;
        }
      }),
    );
  };

  const addComponent = (e: React.MouseEvent<Element, MouseEvent>, shawarmaId: number) => {
    e.preventDefault();
    setFetching(true);
    const component = {
      shawarmaId,
      name: '',
      necessity: true,
    };
    createShawarmaComponent(component)
      .then((data) => setComponents([...components, data]))
      .catch((error) => alert('Не удалось создать компонент!'))
      .finally(() => setFetching(false));
  };

  const removeComponent = (id: number) => {
    setComponents(components.filter((item) => item.id !== id));
  };

  if (fetching) {
    return <ReactLoading type={'spin'} color={'red'} height={80} width={80} />;
  }

  return (
    <>
      <h4 className={styles.infoBlock__subtitle}>Компоненты</h4>
      <Button handleClick={(e) => addComponent(e, shawarmaId)}>Добавить</Button>
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
            <tr key={item.id}>
              <td>
                <input
                  name={'name_' + item.id}
                  value={item.name}
                  onChange={(e) => changeName(item.id, e.target.value)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  name={'necessity_' + item.id}
                  checked={item.necessity}
                  onChange={(e) => changeNecessity(item.id, e.target.checked)}
                />
              </td>
              <td>
                <FaRegTrashCan
                  className={styles.listItem__trashIcon}
                  onClick={() => removeComponent(item.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UpdateShawarmaComponents;
