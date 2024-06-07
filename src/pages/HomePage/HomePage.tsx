import React, { useEffect, useState } from 'react';
import styles from './homepage.module.scss';
import { useScrollToTopEffect } from 'utils';
import { Slider } from 'components/Slider';
import { ProductsSlider } from 'components/ProductsSlider';
import { ClassesSection } from 'components/ClassesSection';
import { useTranslation } from 'react-i18next';
import { getBestRooms, getCheapestRooms } from 'api';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { titleVariants } from 'utils/titleVariants';
import { Room } from 'types/Room';

export const HomePage = () => {
  const [bestRooms, setBestRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cheapestRooms, setCheapestRooms] = useState<Room[]>([]);
  const [t] = useTranslation('global');

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const [bestRooms, cheapestRooms] = await Promise.all([
          getBestRooms(),
          getCheapestRooms(),
        ]);
        setBestRooms(bestRooms);
        setCheapestRooms(cheapestRooms);
      } catch (error) {
        console.error('Error fetching rooms:', error);
        toast.error('Failed to fetch rooms');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, []);

  useScrollToTopEffect();

  return (
    <div className={styles.containers}>
      <motion.h1
        className={styles.title}
        variants={titleVariants}
        initial="initial"
        animate="visible"
      >
        {t('home.Welcome to Admin Hotel!')}
      </motion.h1>
      <Slider />

      <ProductsSlider
        title={t('home.Best rooms')}
        rooms={bestRooms}
        loading={isLoading}
      />

      <ClassesSection />

      <ProductsSlider
        title={t('home.Cheapest rooms')}
        rooms={cheapestRooms}
        loading={isLoading}
      />
    </div>
  );
};
