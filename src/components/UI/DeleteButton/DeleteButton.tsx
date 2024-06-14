import { ReactComponent as Delete } from 'img/icons/delete.svg';
import styles from './deleteButton.module.scss';

export const DeleteButton = () => {
  return (
    <div className={styles.container}>
      <Delete className={styles.icon} />
    </div>
  );
}
