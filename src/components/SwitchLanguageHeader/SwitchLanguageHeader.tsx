import { useTranslation } from "react-i18next";
import { Variants, motion } from 'framer-motion';
import styles from "./switchLanguageHeader.module.scss";
import { useState } from "react";

enum languages {
  UA = 'ua',
  EN = 'en',
}

export const SwitchLanguageHeader = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languages.EN);
  const [, i18n] = useTranslation('global');

  const handleLanguage = (lang: languages) => {
    setSelectedLanguage(lang);
    i18n.changeLanguage(lang);
    setIsChanging(true);

    setTimeout(() => {
      setIsChanging(false);
    }, 100);

    if (selectedLanguage === i18n.language && !isExpanded) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  };

  const containerVariants = {
    initial: {
      width: 70,
    },
    expanded: {
      width: 120,
    },
  };

  const flagVariants: Variants = {
    initial: {
      x: 0,
      transition: {
        type: 'spring',
        duration: 0.04,
      }
    },
    expanded: {
      x: -50,
      transition: {
        type: 'spring',
        duration: 0.1,
      },
    },
    active: {
      scale: 1.05,
    },
  };

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
    setIsChanging(false);
  };

  return (
    <motion.div
      className={styles.container}
      variants={containerVariants}
      initial='initial'
      animate={isExpanded ? 'expanded' : 'initial'}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className={`${styles.flag} ${styles.ua} ${i18n.language === languages.UA ? styles.active : ''}`}
        onClick={() => handleLanguage(languages.UA)}
        variants={flagVariants}
        initial='initial'
        animate={isExpanded && i18n.language === languages.EN && !isChanging ? 'expanded' : 'initial'}
      />

      <motion.div
        className={`${styles.flag} ${styles.en} ${i18n.language === languages.EN ? styles.active : ''}`}
        onClick={() => handleLanguage(languages.EN)}
        variants={flagVariants}
        initial='initial'
        animate={isExpanded && i18n.language === languages.UA && !isChanging ? 'expanded' : 'initial'}
      />
    </motion.div>
  );
};
