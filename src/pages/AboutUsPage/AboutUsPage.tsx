import { useScrollToTopEffect } from 'utils';
import styles from './aboutUsPage.module.scss';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
      staggerChildren: 0.2,
    },
  },
};

const elementVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};

const h2Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const contactsVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut', delay: 0.7 } },
};

export const AboutUsPage = () => {
  const [t] = useTranslation('global');
  useScrollToTopEffect();

  return (
    <>
      <motion.div className={styles.h2_container} variants={h2Variants} initial="hidden" animate="visible">
        <h2 className={styles.h2}>{t('about.About Us')}</h2>
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
          <strong>
            {t('about.text_8')}
          </strong>
        </motion.p>
      </motion.div>

      <motion.div className={styles.h2_container} variants={h2Variants} initial="hidden" animate="visible">
        <h2 className={styles.h2} id='contacts'>{t('about.Contacts')}</h2>
      </motion.div>

      <motion.div className={styles.contacts} variants={contactsVariants} initial="hidden" animate="visible">
        <div className={styles.left_part}>
          <div className={styles.email}>
            <span>{t('about.Email')}</span>
            <Link to="mailto:diploma.admn.hotel@gmail.com">diploma.admn.hotel@gmail.com</Link>
          </div>

          <div className={styles.phone}>
            <span>{t('about.Phone')}</span>
            <Link to="tel:+3800685860026">+380 068 586 00 26</Link>
          </div>

          <div className={styles.address}>
            <span>{t('about.Address')}</span>
            <Link to="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10062.653799649357!2d34.82130746395399!3d50.911443126379645!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x412902193a4fcf87%3A0xa068fce52ec4ba04!2sZdybanka%20Hotel!5e0!3m2!1sen!2sua!4v1718361136295!5m2!1sen!2sua">{t('about.Address value')}</Link>
          </div>
        </div>

        <div className={styles.right_part}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d10062.653799649357!2d34.82130746395399!3d50.911443126379645!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x412902193a4fcf87%3A0xa068fce52ec4ba04!2sZdybanka%20Hotel!5e0!3m2!1sen!2sua!4v1718361136295!5m2!1sen!2sua"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </motion.div>
    </>
  );
}
