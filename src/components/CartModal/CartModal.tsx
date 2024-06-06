import { FC } from 'react';
import Modal from 'react-modal';
import styles from './cartModal.module.scss';
import { useDispatch } from 'react-redux';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const CartModal: FC<ModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch({
      type: 'product/clearCart',
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
      ariaHideApp={false}
    >
      <h3 className={styles.main__text}>
        Checkout is not implemented yet. Do you want to clear the Cart?
      </h3>
      <div className={styles.buttons}>
        <button className={`${styles.button} ${styles.cancel} `} onClick={onClose}>
          Cancel
        </button>
        <button className={`${styles.button} ${styles.confirm} `} onClick={handleClearCart}>
          Confirm
        </button>
      </div>
    </Modal>
  );
};
