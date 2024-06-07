import styles from './header.module.scss';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { NavBar } from 'components/NavBar';
import { SwitchLanguageHeader } from 'components/SwitchLanguageHeader';
import { ReactComponent as Logo } from 'img/icons/Logo.svg';
import { ReactComponent as Menus } from 'img/icons/burger-menu.svg';
import { ReactComponent as Cours } from 'img/icons/cours.svg';
import { ReactComponent as Auth } from 'img/icons/avatar.svg';
import { Theme } from 'components/Theme/Theme';
import Cookies from 'js-cookie';

export const Header = () => {
  const [isMenuShow, setIsMenuShow] = useState(false);
  const [t] = useTranslation('global');

  const cartItes = useSelector((state: RootState) => state.product.cart);
  const cartCount = cartItes.length;
  const [isAuth, setIsAuth] = useState<string | null>(null);

  useEffect(() => {
    const token = Cookies.get('accessToken') || null;
    console.log('Token fetched from cookies:', token); // Логирование для отладки
    setIsAuth(token);
  }, []);

  const auth_url = isAuth ? '/profile' : '/login';
  console.log('isAuth', isAuth); // Логирование для отладки
  console.log('auth_url', auth_url); // Логирование для отладки

  const toggleMenu = () => {
    setIsMenuShow(!isMenuShow);
  };

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    classNames(styles.header__nav_link, { [styles.is_active]: isActive });

  return (
    <div className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__logo}>
          <div>
            <Link to="/" aria-label="Nice gadgets logo">
              <Logo className={styles.header__img} />
            </Link>
          </div>
        </div>

        <nav data-cy="nav" className="navbar">
          <div className={styles.header__navbar}>
            <NavLink className={getLinkClass} to="/">
              {t('header.home')}
            </NavLink>

            <NavLink className={getLinkClass} to="/rooms">
              {t('header.rooms')}
            </NavLink>

            {/* <NavLink className={getLinkClass} to="/tablets">
              {t('header.tablets')}
            </NavLink>

            <NavLink className={getLinkClass} to="/accessories">
              {t('header.accessories')}
            </NavLink> */}
          </div>
        </nav>
      </div>

      <div className={styles.right_side}>
        <div className={styles.language_switcher}>
        <SwitchLanguageHeader />
        </div>

        <div className={styles.theme}>
          <Theme />
        </div>

        <div>
          <NavLink
            to={auth_url}
            className={({ isActive }) =>
              classNames(styles.autos, { [styles.is_active]: isActive })
            }
          >
            <Auth className={styles.auto} />
          </NavLink>
        </div>

        {/* <NavLink
          to="/Favorites"
          className={({ isActive }) =>
            classNames(styles.favorites, { [styles.is_active]: isActive })
          }
        >
          <div className={styles.favoritesIconContainer}>
            <Heart className={styles.favorites__logo} />

            {favoritesCount > 0 && (
              <div className={styles.favoritesItemCount}>{favoritesCount}</div>
            )}
          </div>
        </NavLink> */}

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            classNames(styles.cart, { [styles.is_active]: isActive })
          }
        >
          <div className={styles.cartIconContainer}>
            <Cours className={styles.cart__logo} />
            {cartCount > 0 && (
              <div className={styles.cartItemCount}>{cartCount}</div>
            )}
          </div>
        </NavLink>

        <button className={styles.menus} onClick={toggleMenu}>
          <Menus className={styles.menus__logo} />
        </button>

        {isMenuShow && (
          <div className={styles.navBarWrapper}>
            <NavBar onClose={toggleMenu} />
          </div>
        )}
      </div>
    </div>
  );
};
