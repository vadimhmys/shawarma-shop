import React from 'react';

import styles from './Button.module.scss';

type ButtonPropsType = {
  children: string | string[];
  handleClick?: (event: React.MouseEvent) => void;
  type?: string;
};

export const Button: React.FC<ButtonPropsType> = ({ children, handleClick }) => {
  return (
    <button className={styles.root} onClick={handleClick}>
      {children}
    </button>
  );
};
