import React from 'react';
import axios, { AxiosResponse } from 'axios';
import Counter from '../Counter';

import styles from './ComponentList.module.scss';

export type Component = {
  id: number;
  name: string;
  image: string;
  price: number;
  createdAt: string;
  updatedAt: string;
};

type ComponentListProps = {
  title: string;
  url: string;
};

const ComponentList: React.FC<ComponentListProps> = ({ title, url }) => {
  const [components, setComponents] = React.useState<Component[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res: AxiosResponse = await axios.get(url);
        setComponents(res.data);
      } catch (err: any) {
        console.log('ERROR: ', err.message);
      }
    };

    fetchData();
  }, [title, url]);

  return (
    <>
      {components.length !== 0 && (
        <>
          <p className={styles.title}>{title}</p>
          <hr className={styles.line} />
          <ul className={styles.list}>
            {components.map((component) => (
              <li key={component.id} className={styles.list__item}>
                <div className={styles.content}>
                  <img src={`http://localhost:7000/${component.image}`} alt={component.name} />
                  <span>{component.name}</span>
                </div>
                <Counter component={component} maxCount={4} isSimple={false} />
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default ComponentList;
