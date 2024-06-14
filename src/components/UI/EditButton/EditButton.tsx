import { ReactComponent as Edit } from 'img/icons/edit.svg';
import styles from './editButton.module.scss';

export const EditButton = () => {
  return (
    <div className={styles.container}>
      <Edit className={styles.icon} />
    </div>
  );
}
