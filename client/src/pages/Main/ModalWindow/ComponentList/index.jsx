import React from 'react';

import Counter from '../../../../components/Counter';

import styles from './ComponentList.module.scss';

export default function ComponentList({title, url}) {
  const [components, setComponents] = React.useState([]);

  React.useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((arr) => setComponents(arr));
  }, [title, url]);

  return (
    <>
      <p className={styles.title}>{title}</p>
      <hr className={styles.line}/>
      <ul className={styles.list}>
        {components.map((component) => (
          <li key={component.id} className={styles.list__item}>
            <div className={styles.content}>
              <img src={`http://localhost:7000/${component.image}`} alt={component.name} />
              <span>{component.name}</span>
            </div>
            <Counter price={component.price} maxCount={4} />
          </li>
        ))}
      </ul>
    </>
  );
}
