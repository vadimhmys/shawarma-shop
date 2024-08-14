import React from 'react';
import clsx from 'clsx';
import styles from './PageTitle.module.scss';

type PageTitlePropsType = {
  children: string;
  className?: string;
};

const PageTitle: React.FC<PageTitlePropsType> = ({children, className}) => {
  return <h2 className={clsx(`${styles.title}`, `${className}`)}>{children}</h2>;
}

export default PageTitle;