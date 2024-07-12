import React from 'react';
import axios from 'axios';

import Counter from '../Counter';

import styles from './ComponentList.module.scss';

export default function ComponentList({ title, url }) {
  const [components, setComponents] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(url);
      setComponents(res.data);
      } catch (error) {
        console.log('ERROR: ', error.message);
      }
    };

    fetchData();
  }, [title, url]);

  return (
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
  );
}
