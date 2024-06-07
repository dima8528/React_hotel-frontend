import { usePageLogic } from 'hooks/usePageLogic';
import { useScrollToTopEffect } from 'utils';
import { useTranslation } from 'react-i18next';
import styles from './roomsPage.module.scss';
import { Breadcrumbs } from 'components/Breadcrumbs';
import { Catalog } from 'components/Catalog';
import { Pagination } from 'components/Pagination';
import { motion } from 'framer-motion';
import { NotFoundPage } from 'pages/NotFoundPage';
import { isValidCurrentPage } from 'utils/isValidCurrentPage';
import { titleVariants } from 'utils/titleVariants';
import { RoomTypes } from 'types/RoomTypes';
import { useSearchParams } from 'react-router-dom';

export const RoomsPage = () => {
  const [ searchParams ] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const type = params.get('type') || RoomTypes.ALL;

  const {
    isLoading,
    currentRooms,
    totalCount = 0,
    currentPage,
    handlePagination,
  } = usePageLogic(type as RoomTypes || RoomTypes.ALL);
  const [t] = useTranslation('global');

  useScrollToTopEffect();

  return (
    <>
      {isValidCurrentPage(totalCount, currentPage) && (
        <div className={styles.container}>
          <Breadcrumbs />

          <motion.h1
            className={styles.container__title}
            variants={titleVariants}
            initial="initial"
            animate="visible"
          >
            {t('roomPage.rooms')}
          </motion.h1>

          <Catalog rooms={currentRooms} totalRooms={totalCount} />
          <Pagination
            length={totalCount}
            currentPage={currentPage}
            handlePagination={handlePagination}
          />
        </div>
      )}

      {!isValidCurrentPage(totalCount, currentPage) && !isLoading && <NotFoundPage />}
    </>
  );
};
