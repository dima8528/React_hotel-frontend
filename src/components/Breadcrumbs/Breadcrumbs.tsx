import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import styles from './breadcrumbs.module.scss';
import { getOneRoom } from 'api';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import { Room } from 'types/Room';

enum linkTypes {
  rooms = 'rooms',
}

export const Breadcrumbs = () => {
  const location = useLocation();
  const { pathname } = location;
  const parts = pathname.split('/').filter((part: string) => part !== '');
  const [room, setRoom] = useState<Room | null>(null);

  const [roomNumber, setRoomNumber] = useState('');
  const { roomId } = useParams<{ roomId: string }>();

  useEffect(() => {
    if (roomId) {
      getOneRoom(roomId)
        .then(data => {
          setRoom(data);
        })
        .catch(() => {
          toast.error('Failed to fetch room');
        });
    }
  }, [roomId]);

  async function getRoomNumberById() {
    const result = String(room?.roomNumber);

    return result;
  }

  useEffect(() => {
    async function fetchData() {
      const numb = await getRoomNumberById();
      if (numb !== undefined) {
        setRoomNumber(numb);
      }
    }

    fetchData();
  }, [room]);

  const isBreadcrumbs = (part: string) => {
    if (part === linkTypes.rooms) {
      return part.replace(/\b\w/g, firstLetter => firstLetter.toUpperCase());
    }

    return roomNumber;
  };

  return (
    <div className={styles.breadcrumb__style}>
      <Link to={`/`} className={styles.home__icon}></Link>

      {parts.map((part: string, index: number) => (
        <React.Fragment key={part}>
          {index !== parts.length - 1 && (
            <Link
              to={`/${parts.slice(0, index + 1).join('/')}`}
              className={classNames({
                [styles.breadcrumbs]: index < parts.length - 1,
              })}
            >
              {index < parts.length - 1 &&
                part.replace(/\b\w/g, (firstLetter: string) => firstLetter.toUpperCase())}
            </Link>
          )}

          {index === parts.length - 1 && (
            <span
              className={classNames({
                [styles.breadcrumbs__disabled]: index === parts.length - 1,
              })}
            >
              {isBreadcrumbs(part)}
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
