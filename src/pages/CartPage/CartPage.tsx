import { useEffect, useState } from 'react';
import { RoomButtonType } from 'types/RoomButtonType';
import { RootState } from 'store/store';
import styles from './cartPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useScrollToTopEffect } from 'utils';
import { CartModal } from 'components/CartModal';
import { CartItem } from 'components/CartIem';
import { ButtonPrimary } from 'components/UI/ButtonPrimary';
import { ButtonBack } from 'components/UI/ButtonBack';
import { LottieAnimation } from 'components/UI/LottieAnimation';
import * as animationData from 'animations/EmptyBookingList.json';
import { motion } from 'framer-motion';
import { titleVariants } from 'utils/titleVariants';
import Cookies from 'js-cookie';
import { Room } from 'types/Room';
import { addBooked, getOneUser } from 'api';
import { toast } from 'react-toastify';
import { doDeposit } from 'api';

export const CartPage= () => {
  const { cart, cartTotalAmount, cartTotalNights: cartTotalNights } = useSelector(
    (state: RootState) => state.room,
  );
  const dispatch = useDispatch();
  const [t] = useTranslation('global');
  const [isAuth, setIsAuth] = useState<string | null>(null);

  const [cartRooms, setCartRooms] = useState<Room[]>(() => {
    const savedItems = localStorage.getItem('cart');
    return savedItems ? JSON.parse(savedItems) : [];
  });


  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartRooms));
  }, [cartRooms]);

  const addBookedRooms = async (rooms: Room[]) => {
    const user = await getOneUser();

    addBooked(user.id, rooms)
      .catch(() => {
        toast.error('Failed to add booked room');
      });
  };

  const removeCartRooms = (rooms: Room[]) => {
    setCartRooms(cartRooms.filter((room) => !rooms.includes(room)));
  };

  useEffect(() => {
    const token = Cookies.get('accessToken') || null;

    setIsAuth(token);
  }, []);

  useEffect(() => {
    dispatch({ type: 'room/getTotals' });
  }, [cart, dispatch]);

  useScrollToTopEffect();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleCheckout = async () => {
    if (!isAuth) {
      openModal();
    } else {
      try {
        const user = await getOneUser();

        if (user && cartTotalAmount > user.balance) {
          toast.error(t('booking-list.Unsufficient balance'));
          return;
        }

        addBookedRooms(cartRooms);
        removeCartRooms(cartRooms);
        dispatch({
          type: 'room/clearCart',
        });
        await doDeposit(cartTotalAmount * -1);
        toast.success(t('booking-list.Booking completed'));
      } catch (error) {
        console.error('Error during checkout:', error);
        toast.error(t('booking-list.Checkout failed'));
      }
    }
  };


  return (
    <div className={styles.container}>
      <ButtonBack textForBackButton={t('booking-list.Back')} />

      <motion.h1
        className={styles.title}
        variants={titleVariants}
        initial="initial"
        animate="visible"
      >
        {t('booking-list.Booking list')}
      </motion.h1>

      {cartTotalNights === 0 ? (
        <div className={styles.container__empty__cart}>
          <LottieAnimation animationData={animationData} />
          <Link to="/" className={styles.button}>
            {t('booking-list.Сontinue booking')}
          </Link>
        </div>
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.wrapper__products}>
            {cart.map((room: Room) => (
              <CartItem key={room.id} room={room} />
            ))}
          </div>

          <div className={styles.totalCost}>
            <strong
              className={styles.totalCost__price}
            >{`$${cartTotalAmount}`}</strong>

            <p className={styles.totalCost__itemCount}>
              {t('booking-list.Total for')} {cartTotalNights}{' '}
              {cartTotalNights > 1 ? t('booking-list.nights') : t('booking-list.night')}
            </p>

            <div className={styles.totalCost__line}></div>

            <ButtonPrimary
              textForPrimaryButton={RoomButtonType.CHECKOUT}
              callback={handleCheckout}
              isAvailable
            />
          </div>
        </div>
      )}

      <CartModal isOpen={modalIsOpen} onClose={closeModal} />
    </div>
  );
};
