import { API_URL } from 'api';
import styles from './activatePage.module.scss'
import { To, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

export const ActivatePage = () => {
  const { token } = useParams();
  console.log(token);
  const navigate = useNavigate();

  fetch(`${API_URL}/activation/${token}`)
      .then((res) => res.json())
      .catch((err) => toast.error(err.message))
      .then((data) => {
        toast.success(data.message);
        Cookies.set('accessToken', data.accessToken, { expires: 1 });
        navigate(0 as To, { replace: true });
      });

  return (
    <div className={styles.activate}>
      Pending
    </div>
  );
};
