import { API_URL } from 'api';
import styles from './activatePage.module.scss'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export const ActivatePage = () => {
  const { token } = useParams();
  console.log(token);


  fetch(`${API_URL}/activation/${token}`)
      .then((res) => res.json())
      .catch((err) => toast.error(err.message))
      .then((data) => {
        toast.success(data.message);

        localStorage.setItem('accessToken', data.accessToken);
      });

  return (
    <div className={styles.activate}>
      Pending
    </div>
  );
};
