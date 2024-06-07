import { useEffect, useState } from 'react';
import { RoomButtonType } from 'types/RoomButtonType';
import { Product } from 'types';
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
import * as animationData from 'animations/EmptyCart.json';
import { motion } from 'framer-motion';
import { titleVariants } from 'utils/titleVariants';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


export const CartPage = () => {
  const { cart, cartTotalAmount, cartTotalQuantity } = useSelector(
    (state: RootState) => state.product,
  );
  const dispatch = useDispatch();
  const [t] = useTranslation('global');
  const [isAuth, setIsAuth] = useState<string | null>(null);

  useEffect(() => {
    const token = Cookies.get('accessToken') || null;
    console.log('Token fetched from cookies:', token); // Логирование для отладки
    setIsAuth(token);
  }, []);

  const auth_url = isAuth ? '/profile' : '/login';
  console.log('isAuth', isAuth); // Логирование для отладки
  console.log('auth_url', auth_url); // Логирование для отладки

  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: 'product/getTotals' });
  }, [cart, dispatch]);

  useScrollToTopEffect();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleCheckout = () => {
    if (!isAuth) {
      openModal();
    } else {
      dispatch({
        type: 'product/clearCart',
      });
    }
  };

  const authResult = isAuth ? 'You are autorized' : 'You are not autorized';

  return (
    <div className={styles.container}>
      <ButtonBack textForBackButton={t('cart.Back')} />

      <motion.h1
        className={styles.title}
        variants={titleVariants}
        initial="initial"
        animate="visible"
      >
        {t('cart.Cart')}
        <span style={{ color: 'purple', fontSize: '24px', margin: '0 30px', alignSelf: 'center' }}>{authResult}</span>
        {isAuth && <button onClick={() => {
          Cookies.remove('accessToken');
          navigate('/');
        }}>Log out</button>}
        {!isAuth && <button onClick={() => navigate('../login')}>Log in</button>}
      </motion.h1>

      {cartTotalQuantity === 0 ? (
        <div className={styles.container__empty__cart}>
          <h1 style={{ textAlign: 'center' }}>
            {t('cart.Your cart is empty') + ' :('}
          </h1>
          <LottieAnimation animationData={animationData} />
          <Link to="/" className={styles.button}>
            {t('cart.Сontinue shopping')}
          </Link>
        </div>
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.wrapper__products}>
            {cart.map((product: Product) => (
              <CartItem key={product.id} product={product} />
            ))}
          </div>

          <div className={styles.totalCost}>
            <strong
              className={styles.totalCost__price}
            >{`$${cartTotalAmount}`}</strong>

            <p className={styles.totalCost__itemCount}>
              {t('cart.Total for')} {cartTotalQuantity}{' '}
              {cartTotalQuantity > 1 ? t('cart.items') : t('cart.item')}
            </p>

            <div className={styles.totalCost__line}></div>

            <ButtonPrimary
              textForPrimaryButton={RoomButtonType.CHECKOUT}
              callback={handleCheckout}
            />
          </div>
        </div>
      )}

      <CartModal isOpen={modalIsOpen} onClose={closeModal} />
    </div>
  );
};
