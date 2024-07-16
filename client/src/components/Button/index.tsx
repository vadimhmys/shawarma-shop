import React from 'react';

import styles from './Button.module.scss';

type ButtonProps = {
  children: string | string[];
  handleClick?: any;
};

const Button: React.FC<ButtonProps> = ({ children, handleClick }) => {
  return (
    <button className={styles.root} onClick={handleClick}>
      {children}
    </button>
  );
};

export default Button;
