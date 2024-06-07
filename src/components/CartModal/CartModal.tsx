import { FC } from 'react';
import Modal from 'react-modal';
import styles from './cartModal.module.scss';
// import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const CartModal: FC<ModalProps> = ({ isOpen, onClose }) => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  // const handleClearCart = () => {
  //   dispatch({
  //     type: 'product/clearCart',
  //   });

  //   onClose();
  // };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
      ariaHideApp={false}
    >
      <h3 className={styles.main__text}>
        You are not authorized yet. Do you want to login or create an acount?
      </h3>
      <div className={styles.buttons}>
        <button className={`${styles.button} ${styles.cancel} `} onClick={onClose}>
          Cancel
        </button>
        <button className={`${styles.button} ${styles.confirm} `} onClick={() => navigate('/login')}>
          Confirm
        </button>
      </div>
    </Modal>
  );
};
