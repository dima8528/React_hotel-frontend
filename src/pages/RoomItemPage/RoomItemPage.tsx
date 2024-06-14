import { useEffect, useState } from 'react';
import styles from './roomItemPage.module.scss';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { RoomButtonType } from 'types/RoomButtonType';
import { Room } from 'types/Room';
import { useScrollToTopEffect } from 'utils';
import { useNavigate, useParams } from 'react-router-dom';
import { NotFoundPage } from 'pages/NotFoundPage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { Breadcrumbs } from 'components/Breadcrumbs';
import { ButtonPrimary } from 'components/UI/ButtonPrimary';
import { RoomsSlider } from 'components/RoomsSlider';
import { getImageUrl } from 'utils/urlUtils';
import Skeleton from 'react-loading-skeleton';
import { deleteRoom, getBestRooms, getOneRoom, getOneUser, getRooms } from 'api';
import { EditButton } from 'components/UI/EditButton';
import { DeleteButton } from 'components/UI/DeleteButton';
import { User } from 'types/User';
import { CartModal } from 'components/CartModal';
import { EditModal } from 'components/EditModal';

export const RoomItemPage = () => {
  const [t] = useTranslation('global');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const dispatch = useDispatch();
  useScrollToTopEffect();

  const { roomId } = useParams<{ roomId: string }>();
  const [room, setRoom] = useState<Room | null>(null);
  const [loader, setLoader] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const [errorMessage, setErrorMessage] = useState('');

  const [isSelectedPhoto, setIsSelectedPhoto] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [recommendedRooms, setRecommendedRooms] = useState<Room[]>([]);
  const [showModal, setShowModal] = useState(false);

  const [rooms, setRooms] = useState<Room[] | null>(null);
  const cart = useSelector((state: RootState) => state.room.cart);

  const navigate = useNavigate();

  const getUser = async () => {
    const user = await getOneUser();

    return user;
  };

  useEffect(() => {
    getUser()
      .then((user) => setUser(user))
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      .catch(() => {});
  }, []);

    const roomTypes: { [key: number]: string } = {
      1: 'Standard',
      2: 'Lux',
      3: 'Premium',
    };

  const roomTypeName = room ? roomTypes[room.roomTypeId] : t('roomTypes.Standard');

  let description;

  switch (roomTypeName) {
    case 'Standard':
      description = t('roomTypes.Description standart');
      break;

    case 'Lux':
      description = t('roomTypes.Description lux');
      break;

    case 'Premium':
      description = t('roomTypes.Description premium');
      break;

    default:
      description = t('roomTypes.Description standart');
  }

  const SHORT_DESCRIPTION_SECTION = [
    { language: t('room.Class'), value: t(`roomTypes.${roomTypeName}`) },
    { language: t('room.Floor'), value: room?.floor },
    { language: t('room.Number'), value: room?.roomNumber },
    { language: t('room.Capacity'), value: room?.capacity },
    { language: t('room.Available'), value: room?.available ? t('room.Yes') : t('room.No') },
  ];

  useEffect(() => {
    if (roomId) {
      getOneRoom(roomId)
        .then(data => {
          setRoom(data);
          setLoader(false);
        })
        .catch(() => {
          toast.error('Failed to fetch the room');
          setErrorMessage('Failed to fetch the room');
          setLoader(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      toast.error('Room ID is undefined');
      setLoader(false);
    }
  }, [roomId]);

  useEffect(() => {
    const fetchAllRooms = async () => {
      const allRooms = await getRooms();
      setRooms(allRooms);
    };

    fetchAllRooms();
  }, []);

  useEffect(() => {
    if (roomId) {
      const fetchBestRooms = async () => {
        try {
          const recommendedRooms = await getBestRooms();
          setRecommendedRooms(recommendedRooms);
        } catch (error) {
          setErrorMessage('Failed to fetch rooms');
          toast.error('Failed to fetch rooms');
        }
      };

      fetchBestRooms();
    }
  }, [roomId]);

  const handlePhotoChange = (index: number) => {
    setIsSelectedPhoto(index);
  };

  const isRoomInCart = roomId && cart.some((cartRoom: Room) => cartRoom.id === +roomId);

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (isRoomInCart) {
      toast.error('The room has been removed');

      dispatch({
        type: 'room/removeFromCart',
        payload: room,
      });
    } else {
      toast.success('The room has been added');

      dispatch({
        type: 'room/addToCart',
        payload: room,
      });
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const  handleDeleteRoom = (roomId: number) => {
    deleteRoom(roomId);
    toast.success('The room has been deleted');
    navigate('/rooms');
  };

  return (
    <div className={styles.room__content}>
      <div className={styles.breadcrumbs__rooms}>
        <Breadcrumbs />
      </div>

      {loader && (
        <div className={styles.skeletonContainer}>
          <div className={styles.textSkeleton}>
            <Skeleton height={44} width="100%" />
          </div>

          <div className={styles.upperImages}>
            <div className={styles.smallImageSkeletons}>
              {[...Array(5)].map((_, index) => (
                <Skeleton key={index} className={styles.imageSkeletonSmall} />
              ))}
            </div>

            <div className={styles.bigImageSkeletons}>
              <Skeleton className={styles.imageSkeletonBig} />
            </div>
          </div>

          <div className={styles.smallDescriptionSkeletons}>
            <Skeleton className={styles.smallTextSkeletons} count={2} />

            <Skeleton className={styles.smallPriceSkeletons} />
            <Skeleton className={styles.smallTextSkeletons} />
          </div>

          <div className={styles.textSkeleton}>
            <Skeleton height={44} width="100%" />
          </div>
        </div>
      )}

      {!loader && (
        <>
          {room && !errorMessage.length ? (
            <>
              <div className={styles.page__top}>
                <h1 className={styles.title}>{room.roomName}</h1>

                <div className={styles.room__id}>{'ID: ' + room.id}</div>
              </div>

              <div className={styles.details}>
                <div className={styles.room__images}>
                  <div className={styles.room__image_column}>
                    {room.images.map((image: string, index: number) => (
                      <div
                        key={index}
                        className={classNames(
                          styles.room__image_column_small,
                          {
                            [styles.selected]: index === isSelectedPhoto,
                          },
                        )}
                        onClick={() => handlePhotoChange(index)}
                        onMouseEnter={() => handlePhotoChange(index)}
                      >
                        <img
                          src={getImageUrl(image)}
                          alt={room.roomName}
                          className={`${styles.mainImg}`}
                          style={{ borderRadius: '4px' }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className={styles.room__image_main}>
                    {room.images.map(
                      (image: string, index: number) =>
                        index === isSelectedPhoto && (
                          <img
                            key={index}
                            src={getImageUrl(image)}
                            alt={room.roomName}
                            className={`${styles.mainImage}`}
                          />
                        ),
                    )}
                  </div>
                </div>

                <div className={styles.room__info}>
                  <div className={styles.room__info__colors}>
                    <p className={styles.room__info__colors_title}>
                      {t('roomPage.Specifications')}
                    </p>
                  </div>



                  <div className={styles.room__info__smallDescription}>
                    {SHORT_DESCRIPTION_SECTION.map((item, index) => (
                      <div
                        key={index}
                        className={styles.room__info__smallDescription_s}
                      >
                        <p
                          className={
                            styles.room__info__smallDescription_name
                          }
                        >
                          {item.language}
                        </p>
                        <p
                          className={
                            styles.room__info__smallDescription_value
                          }
                        >
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className={styles.room__info__price}>
                    <div className={`${styles.details__price} ${styles.price}`}>
                      <div className={styles.price__discount} style={{ fontWeight: 'bold' }}>{`$${room.pricePerNight}`}</div>

                      <div className={styles.nights}>{` / ${t('room.night')}`}</div>
                    </div>

                    <div className={styles['room__info-price-buttons']} style={{ maxWidth: '300px' }}>
                      <ButtonPrimary
                        textForPrimaryButton={
                          isRoomInCart
                            ? RoomButtonType.ADDED
                            : RoomButtonType.ADD
                        }
                        callback={handleAddToCart}
                        isAvailable={room.available}
                      />

                      <div className={styles.room__info__price_gap}></div>
                    </div>
                  </div>

                  {user && user.role === 'admin' && (
                    <div className={styles['admin-panel-container']}>
                      <div className={styles['admin-panel']}>
                        <div onClick={() => setShowModal(true)}>
                          <EditButton />
                        </div>

                        <div onClick={openModal}>
                          <DeleteButton />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.more_details}>
                <div className={styles.more_details__about}>
                  <strong className={styles.more_details__about_strong}>
                    {t('roomPage.About')}
                  </strong>

                  <p className={styles.more_details__about_text}>
                    {description}
                  </p>
                </div>
              </div>

              <div className={styles.slider}>
                {rooms && (
                  <RoomsSlider
                    title={t('home.You may also like')}
                    rooms={recommendedRooms}
                    loading={isLoading}
                  />
                )}
              </div>
            </>
          ) : (
            <div className={styles.NotFoundPage}>
              <NotFoundPage />
            </div>
          )}
        </>
      )}

      {room && (
        <CartModal
          text={t('roomPage.Confirm text')}
          isOpen={modalIsOpen}
          onClose={closeModal}
          onConfirm={() => handleDeleteRoom(room.id)}
        />
      )}

      {room && (
        <EditModal
          room={room}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};
