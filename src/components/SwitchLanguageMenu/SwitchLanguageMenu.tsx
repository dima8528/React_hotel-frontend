import { useTranslation } from "react-i18next";
import styles from "./switchLanguageMenu.module.scss";

export const SwitchLanguageMenu = () => {
  const [, i18n] = useTranslation('global');

  const handleLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.flag} ${styles.ua} ${i18n.language === 'ua' ? styles.active : ''}`}
        onClick={() => handleLanguage('ua')}
      />

      <div className={styles.separator} />

      <div
        className={`${styles.flag} ${styles.en} ${i18n.language === 'en' ? styles.active : ''}`}
        onClick={() => handleLanguage('en')}
      />
    </div>
  );
};
