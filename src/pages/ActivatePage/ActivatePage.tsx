import { API_URL } from 'api';
import styles from './activatePage.module.scss'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import * as animationData from 'animations/Activation_Animation.json';
import { LottieAnimation } from 'components/UI/LottieAnimation';

export const ActivatePage = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  fetch(`${API_URL}/activation/${token}`)
      .then((res) => res.json())
      .catch((err) => toast.error(err.message))
      .then((data) => {
        toast.success(data.message);
        Cookies.set('accessToken', data.accessToken, { expires: 1 });
        setTimeout(() => navigate('/'), 5000);
      });

  return (
    <div className={styles.activate}>
      <div className={styles.animation}>
        <LottieAnimation animationData={animationData} />
      </div>

      <p className={styles.text}>Thanks for activating your account! You will be redirected to the main page in 5 seconds
</p>
    </div>
  );
};
