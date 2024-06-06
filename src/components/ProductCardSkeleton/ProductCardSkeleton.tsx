import Skeleton from 'react-loading-skeleton';
import styles from './productCardSkeleton.module.scss';
import 'react-loading-skeleton/dist/skeleton.css';
import { FC } from 'react';
import { useTheme } from 'hooks/useTheme';

type Props = {
  amount: number;
};

export const CardSkeleton: FC<Props> = ({ amount }) => {
  const loadCards = Array(amount).fill(1);
  const { theme } = useTheme();

  return (
    <>
      {loadCards.map((_, i) => (
        <div className={styles.skeletonCard} key={i}>
          <Skeleton
            className={styles.image}
            height={196}
            containerClassName={styles.skeletonCard__container}
            baseColor={theme === 'dark' ? '#313237' : '#b4bdc3'}
          />
          <Skeleton
            height={58}
            containerClassName={styles.skeletonCard__container}
            baseColor={theme === 'dark' ? '#313237' : '#b4bdc3'}
          />
          <Skeleton
            height={31}
            containerClassName={styles.skeletonCard__container}
            baseColor={theme === 'dark' ? '#313237' : '#b4bdc3'}
          />
          <Skeleton
            className={styles.description}
            height={15}
            count={3}
            containerClassName={styles.skeletonCard__container}
            baseColor={theme === 'dark' ? '#313237' : '#b4bdc3'}
          />
          <Skeleton
            className={styles.button}
            height={40}
            containerClassName={styles.skeletonCard__container}
            baseColor={theme === 'dark' ? '#313237' : '#b4bdc3'}
          />
        </div>
      ))}
    </>
  );
};
