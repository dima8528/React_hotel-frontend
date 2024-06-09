import { Link } from 'react-router-dom';
import styles from './navBar.module.scss';
import { useTranslation } from 'react-i18next';
import { ReactComponent as Logo } from 'img/icons/logo.svg';
import { ReactComponent as Close } from 'img/icons/close.svg';
import { ReactComponent as Cours } from 'img/icons/cours.svg';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { SwitchLanguageMenu } from 'components/SwitchLanguageMenu';
// import { Theme } from 'components/Theme/Theme';

export const NavBar = ({ onClose }: { onClose: () => void }) => {
  const [t] = useTranslation('global');

  const cartItes = useSelector((state: RootState) => state.room.cart);
  const cartCount = cartItes.length;

  return (
    <aside className={styles.menu}>
      <div className={styles.menu__top}>
        <Link to="/" className={styles.menu__logo}>
          <Logo className={`${styles.menu__logo} ${styles.logo}`} />
        </Link>

        <Link to="#" className={styles.menu__close} onClick={onClose}>
          <Close className={styles.close} />
        </Link>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.nav__list}>
          <li className={styles.nav__item}>
            <Link to="/" className={styles.nav__link} onClick={onClose}>
              {t('header.home')}
            </Link>
          </li>
          <li className={styles.nav__item}>
            <Link to="/phones" className={styles.nav__link} onClick={onClose}>
              {t('header.phones')}
            </Link>
          </li>
          <li className={styles.nav__item}>
            <Link to="/tablets" className={styles.nav__link} onClick={onClose}>
              {t('header.tablets')}
            </Link>
          </li>
          <li className={styles.nav__item}>
            <Link
              to="/accessories"
              className={styles.nav__link}
              onClick={onClose}
            >
              {t('header.accessories')}
            </Link>
          </li>
        </ul>
      </nav>

      <div className={styles.preferences}>{<SwitchLanguageMenu />}</div>

      {/* <div className={styles.theme}>{<Theme />}</div> */}

      <div className={styles.nav__bottom}>
        <Link to="/cart" className={styles.nav__cart} onClick={onClose}>
          <div className={styles.cartIconContainer}>
            <Cours className={styles.nav__icons} />
            {cartCount > 0 && (
              <div className={styles.favoritesItemCount}>{cartCount}</div>
            )}
          </div>
        </Link>
      </div>
    </aside>
  );
};
