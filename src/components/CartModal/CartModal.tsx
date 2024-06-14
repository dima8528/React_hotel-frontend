import { FC } from 'react';
import Modal from 'react-modal';
import styles from './cartModal.module.scss';
import { useTranslation } from 'react-i18next';

type ModalProps = {
  text: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const CartModal: FC<ModalProps> = ({ text, isOpen, onClose, onConfirm }) => {
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
        {text}
      </h3>
      <div className={styles.buttons}>
        <button className={`${styles.button} ${styles.cancel} `} onClick={onClose}>
          {t('booking-list.Cancel')}
        </button>
        <button className={`${styles.button} ${styles.confirm} `} onClick={onConfirm}>
          {t('booking-list.Confirm')}
        </button>
      </div>
    </Modal>
  );
};
