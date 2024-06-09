import styles from './header.module.scss';
import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { NavBar } from 'components/NavBar';
import { SwitchLanguageHeader } from 'components/SwitchLanguageHeader';
import { ReactComponent as Logo } from 'img/icons/logo.svg';
import { ReactComponent as Menus } from 'img/icons/burger-menu.svg';
import { ReactComponent as Cours } from 'img/icons/list1.svg';
import { ReactComponent as Auth } from 'img/icons/avatar.svg';
import { Theme } from 'components/Theme/Theme';
import Cookies from 'js-cookie';

type Props = {
  accToken: string | null;
};

export const Header: FC<Props> = ({ accToken }) => {
  const [isMenuShow, setIsMenuShow] = useState(false);
  const [t] = useTranslation('global');

  const cartItes = useSelector((state: RootState) => state.room.cart);
  const cartCount = cartItes.length;
  // const [isAuth, setIsAuth] = useState<string | null>(null);

  useEffect(() => {
    const token = Cookies.get('accessToken') || null;
    console.log('Token fetched from cookies:', token);
  }, []);


  const auth_url = accToken ? '/profile' : '/login';

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

            <NavLink className={getLinkClass} to="/about-us">
              {t('header.about')}
            </NavLink>
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

        <NavLink
          to="/booking-list"
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
