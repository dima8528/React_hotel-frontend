import styles from './cartItem.module.scss';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { Link } from 'react-router-dom';
import { ButtonSlider } from 'components/UI/ButtonSlider';
import { getImageUrl } from 'utils/urlUtils';
import { Room } from 'types/Room';

type Props = {
  room: Room;
};

export const CartItem: FC<Props> = ({ room }) => {
  const cart = useSelector((state: RootState) => state.room.cart);
  const dispatch = useDispatch();

  const cartItem: Room = cart.find(
    (item: Room) => item.id === room.id,
  );

  const handleRemoveFromCart = () => {
    dispatch({
      type: 'room/removeFromCart',
      payload: room,
    });
  };

  const handleDeacreaseNights = () => {
    dispatch({
      type: 'room/decreaseCart',
      payload: room,
    });
  };


  const handleAddToCart = () => {
    dispatch({
      type: 'room/addToCart',
      payload: room,
    });
  };

  const url = './../rooms/' + room.id;

  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItem__column1}>
        <div className={styles.cartItem__close} onClick={handleRemoveFromCart}></div>
        <Link to={url} className={styles.cartItem__image}>
          <img
            className={styles.cartItem__productImage}
            src={getImageUrl(room.images[0])}
            alt={room.roomName}
          />
        </Link>

        <Link to={url} className={styles.cartItem__description}>
          <span className={styles.cartItem__name}>{`${room.roomName} – ${room.roomNumber}`}</span>
        </Link>
      </div>

      <div className={styles.cartItem__column2}>
        <div className={styles.cartItem__button}>
          <ButtonSlider
            iconType={'minus'}
            handleClick={() => handleDeacreaseNights()}
            active={room.nights === 1}
          />
          <span className={styles.cartItem__count}>{cartItem.nights}</span>
          <ButtonSlider
            iconType={'plus'}
            handleClick={() => handleAddToCart()}
          />
        </div>

        <span
          className={styles.cartItem__price}
        >{`$${room.pricePerNight * room.nights}`}</span>
      </div>
    </div>
  );
};
