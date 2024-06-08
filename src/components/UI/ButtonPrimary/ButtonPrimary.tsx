import styles from './buttonPrimary.module.scss';
import { FC } from 'react';
import classNames from 'classnames';
import { RoomButtonType } from 'types';
import { useTranslation } from 'react-i18next';

interface Props {
  textForPrimaryButton: RoomButtonType;
  callback: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isAvailable: boolean;
}

export const ButtonPrimary: FC<Props> = ({
  textForPrimaryButton,
  callback,
  isAvailable,
}) => {
  const getButtonClass = (buttonType: RoomButtonType) =>
    classNames(styles.button, {
      [styles.checkout]: RoomButtonType.CHECKOUT === buttonType,
      [styles.default]: RoomButtonType.ADD === buttonType,
      [styles.selected]: RoomButtonType.ADDED === buttonType,
    });

  const [t] = useTranslation('global');

  return (
    <button
      className={getButtonClass(textForPrimaryButton)}
      onClick={callback}
      disabled={!isAvailable}
    >
      {t(`buttons.${textForPrimaryButton}`)}
    </button>
  );
};
