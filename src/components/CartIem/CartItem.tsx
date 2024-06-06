import styles from './cartItem.module.scss';
import { FC } from 'react';
import { Product } from 'types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { Link, useLocation } from 'react-router-dom';
import { ButtonSlider } from 'components/UI/ButtonSlider';
import { getImageUrl } from 'utils/urlUtils';

type Props = {
  product: Product;
};

export const CartItem: FC<Props> = ({ product }) => {
  const cart = useSelector((state: RootState) => state.product.cart);
  const dispatch = useDispatch();

  const cartItem: Product = cart.find(
    (item: Product) => item.id === product.id,
  );

  const handleRemoveFromCart = () => {
    dispatch({
      type: 'product/removeFromCart',
      payload: product,
    });
  };

  const handleDeacreaseQuantity = () => {
    dispatch({
      type: 'product/decreaseCart',
      payload: product,
    });
  };

  const handleAddToCart = () => {
    dispatch({
      type: 'product/addToCart',
      payload: product,
    });
  };

  const { pathname } = useLocation();
  const url =
    pathname !== `/${product.category}`
      ? `../${product.category}/${product.itemId}`
      : `./${product.itemId}`;

  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItem__column1}>
        <div className={styles.cartItem__close} onClick={handleRemoveFromCart}></div>
        <Link to={url} className={styles.cartItem__image}>
          <img
            className={styles.cartItem__productImage}
            src={getImageUrl(product.image)}
            alt={product.name}
          />
        </Link>

        <Link to={url} className={styles.cartItem__description}>
          <span className={styles.cartItem__name}>{product.name}</span>
        </Link>
      </div>

      <div className={styles.cartItem__column2}>
        <div className={styles.cartItem__button}>
          <ButtonSlider
            iconType={'minus'}
            handleClick={() => handleDeacreaseQuantity()}
            active={product.quantity === 1}
          />
          <span className={styles.cartItem__count}>{cartItem.quantity}</span>
          <ButtonSlider
            iconType={'plus'}
            handleClick={() => handleAddToCart()}
          />
        </div>

        <span
          className={styles.cartItem__price}
        >{`$${product.price * product.quantity}`}</span>
      </div>
    </div>
  );
};
