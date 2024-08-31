import React from 'react';

import styles from './Button.module.scss';

type ButtonPropsType = {
  children: string | string[];
  handleClick?: (event: React.MouseEvent) => void;
  type?: string;
  disabled?: boolean;
};

export const Button: React.FC<ButtonPropsType> = ({ children, handleClick, disabled = false }) => {
  return (
    <button className={styles.root} onClick={handleClick} disabled={disabled}>
      {children}
    </button>
  );
};
