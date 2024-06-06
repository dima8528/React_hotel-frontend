import { FC, useEffect, useState } from 'react';
import styles from './catalog.module.scss';
import { Room } from 'types/Room';
import { useTranslation } from 'react-i18next';
import { Filter } from 'components/Filter';
import { RoomCard } from 'components/RoomCard';
import { CardSkeleton } from 'components/ProductCardSkeleton/ProductCardSkeleton';
// import { CardSkeleton } from 'components/ProductCardSkeleton';
// import { CardSkeleton } from 'components/ProductCardSkeleton';

interface Props {
  rooms: Room[];
  totalRooms: number;
}

export const Catalog: FC<Props> = ({ rooms, totalRooms }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [t] = useTranslation('global');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={styles.section}>
      {isLoading && (
        <div className={styles.catalog}>
          <h3 className={styles.catalog__quantity}>
            {totalRooms} {t('roomPage.rooms')}
          </h3>
          <Filter />
          <div className={styles.product}>
            <CardSkeleton amount={10} />
          </div>
        </div>
      )}

      {rooms.length > 0 && !isLoading && (
        <div className={styles.catalog}>
          <h3 className={styles.catalog__quantity}>
            {totalRooms} {t('roomTypes.rooms')}
          </h3>
          <Filter />
          <div className={styles.product}>
            {rooms.map((room: Room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
