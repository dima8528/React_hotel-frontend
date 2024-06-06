import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './categoriesSection.module.scss';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { titleVariants } from 'utils/titleVariants';
import useInViewOnce from 'hooks/useInViewOnce';
import { getRoomTypes, getRooms } from 'api';
import { RoomType } from 'types/RoomType';
import { toast } from 'react-toastify';
import { Room } from 'types/Room';

export const CategoriesSection: FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [t] = useTranslation('global');
  const [ ref, inView ] = useInViewOnce({ threshold: 0 });

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const rooms = await getRooms();
        setRooms(rooms);
      } catch (error) {
        toast.error('Failed to fetch rooms');
      }
    }

    const fetchRoomTypes = async () => {
      try {
        const roomTypes = await getRoomTypes();
        setRoomTypes(roomTypes);
      } catch (error) {
        toast.error('Failed to fetch room types');
      }
    };

    fetchRooms();
    fetchRoomTypes();
  }, []);

  const standarts = rooms.filter(
    (room: Room) => room.roomTypeId === roomTypes[0]?.id,
  );

  const luxes = rooms.filter(
    (room: Room) => room.roomTypeId === roomTypes[1]?.id,
  );

  const premiums = rooms.filter(
    (room: Room) => room.roomTypeId === roomTypes[2]?.id,
  );

  const types = [
    {
      name: t('roomTypes.Standart'),
      totalQuantity: standarts.length,
      image: './img/Standart.jpg',
      backgroundColor: 'violet-background',
      url: '/phones',
    },
    {
      name: t('roomTypes.Lux'),
      totalQuantity: luxes.length,
      image: './img/Lux.jpg',
      backgroundColor: 'grey-background',
      url: '/tablets',
    },
    {
      name: t('roomTypes.Premium'),
      totalQuantity: premiums.length,
      image: './img/Premium.jpg',
      backgroundColor: 'burgundy-background',
      url: '/accessories',
    },
  ];

  return (
    <section className={styles.category}>
      <motion.h1
        className={styles.category__title}
        variants={titleVariants}
        ref={ref}
        initial={!inView ? 'visible' : 'initial'}
        animate={inView ? 'visible' : 'initial'}
      >
        {t('home.Shop by category')}
      </motion.h1>

      <div className={styles.category__container}>
        {types.map(type => (
          <Link
            to={type.url}
            key={type.name}
            className={styles.category__link}
          >
            <article className={styles.category__type}>
              <div
                className={`${styles.category__photo__container} ${styles[type.backgroundColor]}`}
              >
                <img
                  className={styles.category__photo}
                  src={type.image}
                  alt={type.name}
                />
              </div>

              <h3 className={styles.category__name}>{type.name}</h3>

              <p
                className={styles.category__quantity}
              >{`${type.totalQuantity} ${t('roomTypes.rooms')}`}</p>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
};
