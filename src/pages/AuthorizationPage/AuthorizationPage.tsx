import React, { useState, useRef, FC, SetStateAction, Dispatch } from 'react';
import styles from './authorizationPage.module.scss';
import { ReactComponent as Lock } from 'img/icons/lock.svg';
import { ReactComponent as Unlock } from 'img/icons/unlock.svg';
import { API_URL } from 'api';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';

interface PasswordInputProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

type AuthProps = {
  selectLogin: boolean;
  onAccToken: Dispatch<SetStateAction<string | null>>;
}

type LoginProps = {
  onAccToken: Dispatch<SetStateAction<string | null>>;
}

// type RegisterProps = {
//   onAccToken: Dispatch<SetStateAction<string | null>>;
// }

const validateLogin = (email: string, password: string) => {
  if (!email.includes('@')) {
    toast.error('Please enter a valid email address');

    return false;
  }

  if (password.length < 6) {
    toast.error('Password must be at least 6 characters long');

    return false;
  }

  return true;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ placeholder, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    if (inputRef.current) {
      inputRef.current.type = showPassword ? 'text' : 'password';
    }
  };

  return (
    <div className={styles.inputWithIcon}>
      <input
        ref={inputRef}
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
      <div className={styles.passwordToggle} onClick={togglePasswordVisibility}>
        {showPassword ? <Unlock width="20" height="20" /> : <Lock width="20" height="20" />}
      </div>
    </div>
  );
};

const LoginForm: FC<LoginProps> = ({ onAccToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isOk = validateLogin(email, password);

    if (!email || !password) {
      toast.error('Please fill in all fields');

      return;
    }

    if (!isOk) {
      return;
    };

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        Cookies.set('accessToken', data.accessToken, { expires: 0.0416 });
        onAccToken(data.accessToken);
        navigate('/');

        dispatch({
          type: 'email/setEmail',
          payload: email,
        });

        localStorage.setItem('email', email);
      } else {
        toast.error('Invalid login or password. Try again');
      }
    } catch (error) {
      toast.error('Network error. Please try again later.');
      console.error('Network error:', error);
    }
  };


  return (
    <form onSubmit={handleLoginSubmit}>
      <h2 className={styles.title}>Login</h2>
      <div className={styles.inputWithIcon}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className={styles.inputWithIcon}>
        <PasswordInput
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
      <hr className={styles.separator} />
    </form>
  );
};

const RegisterForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isOk = validateLogin(email, password);

    if (!isOk) {
      return;
    };

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    await fetch(`${API_URL}/registration`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName, email, password }),
    })
    .then(response => {
      if (!response.ok) {
        // toast.error('The email is already in use');
        throw new Error('The email is already in use');
      }

      toast.success('Please check your email');
      navigate('/');

      // return response.json();
    })
    .catch(() => {
      toast.error('The email is already in use');
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2 className={styles.title}>Sign up</h2>

      <div className={styles.nameFields}>
        <div className={styles.inputWithIcon}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputWithIcon}>
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
      </div>

      <div className={styles.inputWithIcon}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className={styles.inputWithIcon}>
        <PasswordInput
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className={styles.inputWithIcon}>
        <PasswordInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <button type="submit">Sign up</button>
      <hr className={styles.separator} />
    </form>
  );
};

export const AuthorizationPage: FC<AuthProps> = ({ selectLogin, onAccToken }) => {
  const isLogin = selectLogin;
  const navigate = useNavigate();
  const location = useLocation();

  const switchMode = () => {
    if (location.pathname === '/login') {
      navigate('/registration');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        {isLogin ? <LoginForm onAccToken={onAccToken} /> : <RegisterForm />}
        <div className={styles.switchButton} onClick={switchMode}>
          {isLogin ? 'No account? Sign up here' : 'Login here'}
        </div>
      </div>
    </div>
  );
};
