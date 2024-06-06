import { FC } from 'react';
import Lottie, { Options } from 'react-lottie';

interface LottieAnimationProps {
  height?: string;
  width?: string;
  loop?: boolean;
  autoplay?: boolean;
  animationData: object;
  speed?: number;
}

export const LottieAnimation: FC<LottieAnimationProps> = ({
  height = 'auto',
  width = 'auto',
  loop = true,
  autoplay = true,
  animationData,
  speed = 1,
}) => {
  const options: Options = {
    loop, autoplay, animationData,
  };

  return (
    <Lottie
      options={options}
      height={height}
      width={width}
      speed={speed}
      isClickToPauseDisabled={true}
    />
  );
};
