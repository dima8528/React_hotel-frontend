import { FC } from 'react';
import styles from './buttonSlider.module.scss';


interface ButtonSliderProps {
  iconType: 'arrowLeft' | 'arrowRight' | 'plus' | 'minus';
  active?: boolean;
  handleClick?: () => void;
  disabled?: boolean;
}

export const ButtonSlider: FC<ButtonSliderProps> = ({ iconType, active, handleClick }) => {
  return (
    <div
    className={`${styles.button} ${active ? styles.disable : styles.default}`}
    onClick={handleClick}
    >
      <div
      className={`${styles.icon} ${active ? styles[iconType] : `${styles[iconType]} ${styles.disable}`}`}
    >
    </div>
  </div>

  );
};
