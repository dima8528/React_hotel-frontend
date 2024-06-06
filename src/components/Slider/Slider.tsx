import React, { useState, useEffect, useRef } from 'react';
import styles from './slider.module.scss';
import classNames from 'classnames';
import { SliderSkeleton } from '../SliderSkeleton';

const images = [
  require('./img/1.jpg'),
  require('./img/2.jpg'),
  require('./img/3.jpg'),
  // require('./img/4.jpg'),
  // require('./img/5.jpg'),
];

export const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const lastIndex = images.length - 1;
  const banner = useRef<HTMLDivElement>(null);
  const transformValue = sliderWidth * currentIndex;
  const [touchPosition, setTouchPosition] = useState<number | null>(null);

  useEffect(() => {
    if (banner.current) {
      setSliderWidth(banner.current.offsetWidth);
    }
  }, [currentIndex]);

  useEffect(() => {
    const timerId = setInterval(() => {
      handleNextSlide();
    }, 5000);

    return () => clearInterval(timerId);
  }, [currentIndex]);

  useEffect(() => {
    const imageLoadPromises = images.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
        })
    );

    Promise.all(imageLoadPromises).then(() => {
      setIsLoading(false);
    });
  }, []);

  const handlePrevSlide = () => {
    if (currentIndex !== 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(lastIndex);
    }
  };

  const handleNextSlide = () => {
    if (currentIndex !== lastIndex) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchPosition(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchPosition === null) {
      return;
    }

    const currentX = e.touches[0].clientX;
    const diff = touchPosition - currentX;

    if (diff > 5) {
      handleNextSlide();
    }

    if (diff < -5) {
      handlePrevSlide();
    }

    setTouchPosition(null);
  };

  return (
    <section
      className={styles.carousel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      {isLoading ? (
        <div className={styles['carousel__slider-container']} ref={banner}>
          <SliderSkeleton />
        </div>
      ) : (
        <div className={styles.carousel__slider}>
          <button
            type="button"
            aria-label="button"
            className={classNames(styles['carousel__slider-button'], styles['carousel__slider-button-left'])}
            onClick={handlePrevSlide}
          >
            <div className={classNames(styles.icon, styles['icon-left'])} />
          </button>

          <div className={styles['carousel__slider-container']} ref={banner}>
            <ul
              className={styles['carousel__slider-list']}
              style={{
                transform: `translateX(${-transformValue}px)`,
              }}
            >
              {images.map((image, index) => (
                <li key={index} className={styles['carousel__slider-item']}>
                  <img
                    src={image}
                    alt="Banner"
                    className={styles['carousel__slider-image']}
                  />
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            aria-label="button"
            className={classNames(styles['carousel__slider-button'], styles['carousel__slider-button-right'])}
            onClick={handleNextSlide}
          >
            <div className={classNames(styles.icon, styles['icon-right'])} />
          </button>
        </div>
      )}

      <div className={styles['carousel__dots']}>
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label="dots"
            className={classNames(styles['carousel__dots-item'], {
              [styles['banner-active']]: currentIndex === index,
            })}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </section>
  );
};
