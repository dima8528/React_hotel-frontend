import React from 'react';
import styles from './buttonPagination.module.scss';

type ButtonPaginationProps = {
  text: number;
  active: boolean;
  onClick: () => void;
};

export const ButtonPagination: React.FC<ButtonPaginationProps> = ({ text, active, onClick }) => {
  return (
    <div
      className={`${styles.button} ${active ? styles.selected : styles.default}`}
      onClick={onClick}
    >
      {text}
    </div>
  );
};
