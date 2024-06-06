import { Link } from 'react-router-dom';
import styles from './notFoundPage.module.scss';
import { useScrollToTopEffect } from 'utils';
import { useTranslation } from 'react-i18next';

export const NotFoundPage = () => {
  const [t] = useTranslation('global');
  useScrollToTopEffect();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t('404.Oops, page not found!')}</h1>
      <Link to="/" className={styles.button}>
        {t('404.Go to homepage')}
      </Link>
    </div>
  );
};
