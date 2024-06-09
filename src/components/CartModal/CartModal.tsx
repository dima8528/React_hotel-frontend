import { FC } from 'react';
import Modal from 'react-modal';
import styles from './cartModal.module.scss';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const CartModal: FC<ModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [t] = useTranslation('global');

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
      ariaHideApp={false}
    >
      <h3 className={styles.main__text}>
        {t('booking-list.You are not authorized yet. Do you want to login or create an acount?')}
      </h3>
      <div className={styles.buttons}>
        <button className={`${styles.button} ${styles.cancel} `} onClick={onClose}>
          {t('booking-list.Cancel')}
        </button>
        <button className={`${styles.button} ${styles.confirm} `} onClick={() => navigate('/login')}>
          {t('booking-list.Confirm')}
        </button>
      </div>
    </Modal>
  );
};
