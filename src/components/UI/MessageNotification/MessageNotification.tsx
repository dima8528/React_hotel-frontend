import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const MessageContainer = () => (
  <ToastContainer
    stacked
    position="bottom-right"
    autoClose={4000}
    hideProgressBar={false}
    rtl={false}
    closeOnClick
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
  />
)
