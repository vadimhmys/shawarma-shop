import React from 'react';

import styles from './PageTitle.module.scss';

export default function PageTitle({children}) {
  return <h2 className={styles.title}>{children}</h2>;
}
