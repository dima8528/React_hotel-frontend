import styles from './theme.module.scss';
import React from 'react';
import { useTheme } from '../../hooks/useTheme';

export const Theme = () => {
  const { theme, setTheme } = useTheme();

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <div className={styles.toggleWrapper}>
      <input
        type="checkbox"
        name="toggle"
        className={styles.mobileToggle}
        id="toggle"
        onChange={handleToggle}
        checked={theme === 'dark'}
      />
      <label htmlFor="toggle"></label>

      <div className={styles.bab}></div>
    </div>
  );
};
