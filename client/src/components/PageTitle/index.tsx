import React from 'react';

import styles from './PageTitle.module.scss';

type PageTitlePropsType = {
  children: string;
};

const PageTitle: React.FC<PageTitlePropsType> = ({children}) => {
  return <h2 className={styles.title}>{children}</h2>;
}

export default PageTitle;