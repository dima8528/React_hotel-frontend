import { useEffect, useState } from 'react';
import styles from './profilePage.module.scss';
import { User } from 'types/User';
import { Room } from 'types/Room';
import { getOneUser } from 'api';

export const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);

  const [bookedRooms, setBookedRooms] = useState<Room[]>(() => {
    const savedItems = localStorage.getItem('bookedRooms');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  useEffect(() => {
    localStorage.setItem('bookedRooms', JSON.stringify(bookedRooms));
  }, [bookedRooms]);

  useEffect(() => {
    getOneUser('dmytro.haidash.work@gmail.com')
      .then((data) => setUser(data));
  }, []);

  if (user) {
    console.log(user);
  }

  // const removeBookedRooms = (rooms: Room[]) => {
  //   setBookedRooms(bookedRooms.filter((room) => !rooms.includes(room)));
  // };

  return (
    <div className={styles.profile}>
      <div className={styles.profile__avatar}>



      </div>
    </div>
  );
}
