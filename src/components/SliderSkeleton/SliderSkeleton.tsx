import Skeleton from 'react-loading-skeleton';
import styles from './sliderSkeleton.module.scss';
import 'react-loading-skeleton/dist/skeleton.css';
import { FC } from 'react';
import './sliderSkeleton.module.scss'
import { useTheme } from '../../hooks/useTheme';

export const SliderSkeleton: FC = () => {
  const { theme } = useTheme();

  return (
    <div className={styles.skeletonSlider}>
      <Skeleton className={styles.image} height={400} containerClassName={styles.skeletonSlider__container} baseColor={theme === 'dark' ? '#313237' : '#b4bdc3'} />
    </div>
  );
};
