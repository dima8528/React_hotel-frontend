import React, { useState, useRef, useEffect, FC } from 'react';
import { Room } from 'types/Room';
import './roomsSlider.scss';
import { RoomCard } from 'components/RoomCard';
import { CardSkeleton } from 'components/RoomCardSkeleton/RoomCardSkeleton';
// import { CardSkeleton } from 'components/ProductCardSkeleton';

type Props = {
  rooms: Room[];
  title: string;
  loading: boolean;
  isPrimaryButtonShown?: boolean;
};

export const RoomsSlider: FC<Props> = ({ title, rooms, loading, isPrimaryButtonShown }) => {
  const [activeArrowLeft, setActiveArrowLeft] = useState(false);
  const [activeArrowRight, setActiveArrowRight] = useState(true);
  const slider = useRef<HTMLUListElement>(null);
  const [sliderItemWidth, setSliderItemWidth] = useState(0);
  const [touchPosition, setTouchPosition] = useState<number | null>(null);
  const [lastClickTime, setLastClickTime] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;

      if (windowWidth >= 640 && windowWidth <= 1199) {
        setSliderItemWidth(237);
      } else if (windowWidth >= 320 && windowWidth < 640) {
        setSliderItemWidth(220);
      } else {
        setSliderItemWidth(272);
      }

      if (slider.current) {
        slider.current.scrollTo(0, 0);
        setActiveArrowLeft(false);
        setActiveArrowRight(true);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const goLeft = () => {
    const now = new Date().getTime();
    if (now - lastClickTime < 500) {
      return;
    }
    setLastClickTime(now);

    if (slider.current) {
      setActiveArrowRight(true);
      const currentScroll = slider.current.scrollLeft;

      slider.current.scrollTo(currentScroll - sliderItemWidth - 16, 0);
      if (currentScroll - sliderItemWidth <= 0) {
        setActiveArrowLeft(false);
      }
    }
  };

  const goRight = () => {
    const now = new Date().getTime();
    if (now - lastClickTime < 500) {
      return;
    }
    setLastClickTime(now);

    if (slider.current) {
      const currentScroll = slider.current.scrollLeft;
      const maxScroll = slider.current.scrollWidth - slider.current.offsetWidth;

      slider.current.scrollTo(currentScroll + sliderItemWidth + 16, 0);
      setActiveArrowLeft(true);
      if (currentScroll + sliderItemWidth >= maxScroll) {
        setActiveArrowRight(false);
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLUListElement>) => {
    setTouchPosition(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLUListElement>) => {
    if (touchPosition === null) {
      return;
    }

    const currentX = e.touches[0].clientX;
    const diff = touchPosition - currentX;

    if (diff > 5) {
      goRight();
    }

    if (diff < -5) {
      goLeft();
    }

    setTouchPosition(null);
  };

  return (
    <div className="carousel">
      <div className="carousel__top">
        <h2 className="carousel__title">{title}</h2>

        <div className="carousel__nav">
          <button
            className="carousel__button carousel__button--left"
            type="button"
            onClick={goLeft}
            disabled={!activeArrowLeft}
            aria-label="slider move left"
          >
            <svg
              className="arrow"
              width="6"
              height="10"
              viewBox="0 0 6 10"
              fill="#0F0F11"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.47146 0.528636C5.21111 0.268287 4.789 0.268287 4.52865 0.528636L0.528646 4.52864C0.268297 4.78899 0.268297 5.2111 0.528646 5.47145L4.52865 9.47145C4.789 9.7318 5.21111 9.7318 5.47146 9.47145C5.7318 9.2111 5.7318 8.78899 5.47146 8.52864L1.94286 5.00004L5.47146 1.47145C5.7318 1.2111 5.7318 0.788986 5.47146 0.528636Z"
                fill={`${!activeArrowLeft ? 'var(--arrow-disable-color)' : 'var(--arrow-main-color)'}`}
              />
            </svg>
          </button>

          <button
            className="carousel__button carousel__button--right"
            type="button"
            onClick={goRight}
            disabled={!activeArrowRight}
            aria-label="slider move right"
          >
            <svg
              className="arrow"
              width="6"
              height="10"
              viewBox="0 0 6 10"
              fill="#0F0F11"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.528636 0.528636C0.788986 0.268287 1.2111 0.268287 1.47145 0.528636L5.47145 4.52864C5.73179 4.78899 5.73179 5.2111 5.47145 5.47145L1.47145 9.47145C1.2111 9.7318 0.788986 9.7318 0.528636 9.47145C0.268287 9.2111 0.268287 8.78899 0.528636 8.52864L4.05723 5.00004L0.528636 1.47145C0.268287 1.2111 0.268287 0.788986 0.528636 0.528636Z"
                fill={`${!activeArrowRight ? 'var(--arrow-disable-color)' : 'var(--arrow-main-color)'}`}
              />
            </svg>
          </button>
        </div>
      </div>
      <ul
        className="carousel__cards"
        ref={slider}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {loading ? (
          <CardSkeleton amount={6} />
        ) : (
          rooms.map(room => (
            <li key={room.id}>
              <RoomCard room={room} isPrimaryButtonShown={isPrimaryButtonShown} />
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
