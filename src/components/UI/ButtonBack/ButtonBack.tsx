import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './buttonBack.module.scss';


type Props = {
  textForBackButton: string;
};

export const ButtonBack: FC<Props> = ({ textForBackButton }) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Link to="#" className={styles.button} onClick={goBack}>
      {textForBackButton}
    </Link>
  );
};
