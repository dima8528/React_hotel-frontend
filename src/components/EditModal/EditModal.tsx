import { Room } from 'types/Room';
import styles from './editModal.module.scss';
import { useState, FC } from 'react';
import { Dropdown } from 'components/UI/DropDown';
import { FilterBy } from 'components/Filter';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'hooks/useTheme';
import { Option } from 'types/Option';
import Modal from 'react-modal';
import { updateRoom } from 'api';

enum types {
  'Standard' = 1,
  'Lux' = 2,
  'Premium' = 3,
};

type ModalProps = {
  room: Room;
  isOpen: boolean;
  onClose: () => void;
};

export const EditModal: FC<ModalProps> = ({ room, isOpen, onClose }) => {
  const [roomName, setRoomName] = useState(room.roomName);
  const [roomNumber, setRoomNumber] = useState(room.roomNumber);
  const [capacity, setCapacity] = useState(room.capacity);
  const [roomTypeId, setRoomTypeId] = useState<FilterBy>(types[room.roomTypeId] as FilterBy);
  const [pricePerNight, setPricePerNight] = useState(room.pricePerNight);

  const [t] = useTranslation('global');

  const options = [
    { value: 'Standard', label: t(`filters.${FilterBy.STANDARD}`) },
    { value: 'Lux', label: t(`filters.${FilterBy.LUX}`) },
    { value: 'Premium', label: t(`filters.${FilterBy.PREMIUM}`) },
  ];

  const { theme } = useTheme();
  let isDarkTheme;
  theme === 'dark' ? (isDarkTheme = true) : (isDarkTheme = false);

  console.log(roomTypeId as unknown as Option);

  const handleConfirm = async () => {
    const roomData = {
      roomName,
      roomNumber,
      capacity,
      roomTypeId: String(roomTypeId),
      pricePerNight,
    };

    updateRoom(room.id, roomData)
      .then(() => {
        window.location.reload();
      })
      .catch(() => {
        console.error('Failed to update room');
      });
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        className={styles.modal}
        overlayClassName={styles.overlay}
        ariaHideApp={false}
      >
        <div className={styles.modal__content}>
          <p className={styles.main__text}>Edit Room</p>

          <div className={styles.inputs}>
            <div className={styles.container}>
              <span className={styles.title}>Room name</span>

              <input
                type="text"
                placeholder="Room name"
                value={roomName}
                className={styles['input-field']}
                onChange={(e) => setRoomName(e.target.value)}
              />
            </div>

            <div className={styles.container}>
              <span className={styles.title}>Room number</span>

              <input
                type="text"
                placeholder="Room number"
                value={roomNumber}
                className={styles['input-field']}
                onChange={(e) => setRoomNumber(Number(e.target.value))}
              />
            </div>

            <div className={styles.dropdown}>
              <Dropdown
                defaultValue={roomTypeId as unknown as Option}
                options={options}
                onFilterSelectChange={(roomTypeId) => setRoomTypeId(roomTypeId)}
                theme={isDarkTheme}
              />
            </div>

            <div className={styles.container}>
              <span className={styles.title}>Capacity</span>

              <input
                type="text"
                placeholder="Capacity"
                value={capacity}
                className={styles['input-field']}
                onChange={(e) => setCapacity(Number(e.target.value))}
              />
            </div>

            <div className={styles.container}>
              <span className={styles.title}>Price per night</span>

              <input
                type="text"
                placeholder="Price per night"
                value={pricePerNight}
                className={styles['input-field']}
                onChange={(e) => setPricePerNight(Number(e.target.value))}
              />
            </div>
          </div>

          <div className={styles.buttons}>
            <button className={`${styles.button} ${styles.cancel} `} onClick={onClose}>
              {t('booking-list.Cancel')}
            </button>
            <button className={`${styles.button} ${styles.confirm} `} onClick={handleConfirm}>
              {t('booking-list.Confirm')}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
