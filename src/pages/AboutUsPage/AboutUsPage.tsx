import { useScrollToTopEffect } from 'utils';
import styles from './aboutUsPage.module.scss';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
      staggerChildren: 0.3,
    },
  },
};

const elementVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const AboutUsPage = () => {
  const [t] = useTranslation('global');
  useScrollToTopEffect();

  return (
    <>
      <motion.div className={styles.h1_container} variants={elementVariants}>
        <h1 className={styles.h1}>{t('about.About Us')}</h1>
      </motion.div>

      <motion.div
        className={styles.container}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className={styles.element} variants={elementVariants}>
          <strong className={styles.title}>
            {t('about.title_1')}
          </strong>

          <p className={styles.paragraph}>
            {t('about.text_1')}
          </p>
        </motion.div>

        <motion.div className={styles.element} variants={elementVariants}>
          <strong className={styles.title}>
            {t('about.title_2')}
          </strong>

          <p className={styles.paragraph}>
            {t('about.text_2')}
          </p>
        </motion.div>

        <motion.div className={styles.element} variants={elementVariants}>
          <strong className={styles.title}>
            {t('about.title_3')}
          </strong>

          <p className={styles.paragraph}>
            {t('about.text_3')}
          </p>
        </motion.div>

        <motion.div className={styles.element} variants={elementVariants}>
          <strong className={styles.title}>
            {t('about.title_4')}
          </strong>

          <p className={styles.paragraph}>
            {t('about.text_4')}
          </p>
        </motion.div>

        <motion.div className={styles.element} variants={elementVariants}>
          <strong className={styles.title}>
            {t('about.title_5')}
          </strong>

          <p className={styles.paragraph}>
            {t('about.text_5')}
          </p>
        </motion.div>

        <motion.div className={styles.element} variants={elementVariants}>
          <strong className={styles.title}>
            {t('about.title_6')}
          </strong>

          <p className={styles.paragraph}>
            {t('about.text_6')}
          </p>
        </motion.div>

        <motion.div className={styles.element} variants={elementVariants}>
          <strong className={styles.title}>
            {t('about.title_7')}
          </strong>

          <p className={styles.paragraph}>
            {t('about.text_7')}
          </p>
        </motion.div>

        <motion.p className={styles.paragraph} variants={elementVariants}>
          {t('about.text_8')}
        </motion.p>
      </motion.div>
    </>
  );
}
