import React, { FC, useMemo } from 'react';
import { RootState } from 'store/store';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Variants, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { RoomButtonType } from 'types/RoomButtonType';
import styles from './roomCard.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonPrimary } from 'components/UI/ButtonPrimary';
import useInViewOnce from '../../hooks/useInViewOnce';
import { Room } from 'types/Room';
import { API_URL } from 'api';

type Props = {
  room: Room;
  isPrimaryButtonShown?: boolean;
};

export const RoomCard: FC<Props> = ({ room, isPrimaryButtonShown }) => {
  const dispatch = useDispatch();
  const [t] = useTranslation('global');

  const cart = useSelector((state: RootState) => state.room.cart);
  const location = useLocation();

  const roomTypes: { [key: number]: string } = {
    1: 'Standard',
    2: 'Lux',
    3: 'Premium',
  };

  const roomName = room.roomName;
  const roomTypeId = room.roomTypeId;
  const roomTypeName = roomTypes[roomTypeId];

  const roomNumber = String(room.roomNumber);

  const isProductInCart = cart.some(
    (cartRoom: Room) => cartRoom.id === room.id,
  );

  let isShown = true;

  if (isPrimaryButtonShown) {
    isShown = isPrimaryButtonShown;
  }

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (isProductInCart) {
      toast.error('The room has been removed from the booked ones');

      dispatch({
        type: 'room/removeFromCart',
        payload: room,
      });
    } else {
      toast.success('The room has been added to the booked ones');

      dispatch({
        type: 'room/addToCart',
        payload: room,
      });
    }
  };

  const url = useMemo(() => {
    const basePath = `../rooms`;
    const roomPath = `/${room.id}`;
    const currentPath = location.pathname;

    const pathSegments = currentPath.split('/').filter(Boolean);
    const lastSegment = pathSegments[pathSegments.length - 1];

    if (
      lastSegment &&
      lastSegment !== roomTypeName &&
      !lastSegment.includes(String(roomTypeName))
    ) {
      return `${basePath}${roomPath}`;
    }

    return `${basePath}${roomPath}`;
  }, [location.pathname, roomTypeName, room.id]);

  const cardVariants: Variants = {
    offscreen: {
      y: 50,
    },
    onscreen: {
      y: 0,
      transition: {
        type: 'spring',
        bounce: 0.1,
        duration: 0.4,
      },
    },
  };

  const [ref, inView] = useInViewOnce({ threshold: 0 });

  const image_url = `${API_URL}/${room.images[0]}`;

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial={!inView ? 'onscreen' : 'offscreen'}
      animate={inView ? 'onscreen' : 'offscreen'}
    >
      <Link to={url} style={{ textDecoration: 'none', color: 'black' }}>
        <article className={styles.wrapper}>
          <div className={styles.room}>
            <div className={styles.room__image}>
              <img
                className={styles.room__image_img}
                src={image_url}
                alt={roomNumber}
              />
            </div>

            <div className={`${styles.room__details} ${styles.details}`}>
              <div className={styles.details__top}>
                <h3 className={styles.details__name}>{roomName}</h3>

                {/* <p className={styles.details__number}>{roomNumber}</p> */}
              </div>

              <div className={`${styles.details__price} ${styles.price}`} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div className={styles.price__discount}>{`$${room.pricePerNight}`}</div>

                <div className={styles.nights}>{`/ ${t('room.night')}`}</div>
              </div>
            </div>

            <div className={styles.underline}></div>

            <div className={styles.description}>
              <div
                className={`${styles.description__container} ${styles.info}`}
              >
                <span className={styles.info__title}>
                  {t('roomTypes.Class')}
                </span>
                <span className={styles.info__value}>{t(`roomTypes.${roomTypeName}`)}</span>
              </div>

              <div className={styles.description__container}>
                <span className={styles.info__title}>
                  {t('room.Capacity')}
                </span>
                <span className={styles.info__value}>{room.capacity}</span>
              </div>

              <div className={styles.description__container}>
                <span className={styles.info__title}>{t('room.Available')}</span>
                <span className={styles.info__value}>{room.available ? t('room.Yes') : t('room.No')}</span>
              </div>
            </div>

            <div className={styles.buttons__container}>
              {isShown && (
                <ButtonPrimary
                  textForPrimaryButton={
                    isProductInCart
                      ? RoomButtonType.ADDED
                      : RoomButtonType.ADD
                  }
                  callback={handleAddToCart}
                  isAvailable={room.available}
                />
              )}
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
};
