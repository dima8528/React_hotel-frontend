import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import styles from './profilePage.module.scss';
import { User } from 'types/User';
import { Room } from 'types/Room';
import { getOneUser } from 'api';
import { ReactComponent as Auth } from 'img/icons/avatar.svg';
import { RoomsSlider } from 'components/RoomsSlider';
import { useTranslation } from 'react-i18next';
import { doDeposit } from 'api';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

type Props = {
  onAccToken: Dispatch<SetStateAction<string | null>>;
}

export const ProfilePage: FC<Props> = ({ onAccToken }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isloading, setIsLoading] = useState(true);
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState(0);
  const [t] = useTranslation('global');
  const navigate = useNavigate();

  const userRole = user?.role || 'USER';

  const [bookedRooms] = useState<Room[]>(() => {
    const savedItems = localStorage.getItem('bookedRooms');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  useEffect(() => {
    localStorage.setItem('bookedRooms', JSON.stringify(bookedRooms));
  }, [bookedRooms]);

  useEffect(() => {
    getOneUser()
      .then((data) => setUser(data))
      .finally(() => setIsLoading(false));
  }, [balance]);

  if (user) {
    console.log(user);
  }

  const handleDeposit = async (amount: number) => {
    const newBalance = await doDeposit(amount);
    setBalance(newBalance);

    toast.success(`${amount}$ has been added`);
  }

  const getProfileRoleClass = (role: string) => {
    switch (role) {
      case 'user':
        return styles['profile__role--user'];
      case 'admin':
        return styles['profile__role--admin'];
      default:
        return '';
    }
  };

  const handleExit = () => {
    Cookies.remove('accessToken');
    navigate('/');
    onAccToken(null);
  };

  return (
    <>
      <div className={styles.profile}>
        <div className={styles.profile__avatar}>
          <Auth className={styles.profile__cours} />

          <div className={getProfileRoleClass(userRole)}>{user?.role.toUpperCase()}</div>
        </div>

        <div className={styles.profile__info}>
          <div className={styles.profile__name}>
            {user?.firstName} {user?.lastName}
          </div>
          <div className={styles.profile__email}>{user?.email}</div>
        </div>

        <div className={styles.profile__divider}/>
      </div>

      <div className={styles.operations}>
        <div className={styles.balance}>
          {/* {t('roomTypes.Standard')}: {user?.balance} */}
          {t('profile.balance')}: {user?.balance}
        </div>

        <div className={styles.doDeposit}>
          <input className={styles.input} type="text" value={amount} onChange={(e) => setAmount(Number(e.target.value))} placeholder="Amount" />

          <button className={styles.deposit} onClick={() => handleDeposit(amount)}>{t('profile.deposit')}</button>
        </div>
      </div>

      <div className={styles.ex_container}>
        <button className={styles.exit} onClick={handleExit}>{t('profile.logout')}</button>
      </div>

      <div className={styles.booked_rooms}>
        <RoomsSlider rooms={bookedRooms} title='Booked rooms' loading={isloading} isPrimaryButtonShown={false} />
      </div>
    </>
  );
}
