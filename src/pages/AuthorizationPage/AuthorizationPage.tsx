import React, { useState, useRef, FC } from 'react';
import styles from './authorizationPage.module.scss';
import { ReactComponent as Lock } from 'img/icons/lock.svg';
import { ReactComponent as Unlock } from 'img/icons/unlock.svg';
import { API_URL } from 'api';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

interface PasswordInputProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
        Cookies.set('accessToken', data.accessToken, { expires: 1 });
        navigate(-1);
        console.log('ok');
      } else {
        toast.error('Invalid login or password. Try again');
        console.log('not ok');
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


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    .catch((err) => {
      console.log(err);
      toast.error('The email is already in use');
    });
  };

  return (
    <form onSubmit={handleSubmit}>
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

type Props = {
  selectLogin: boolean;
}

export const AuthorizationPage: FC<Props> = ({ selectLogin }) => {
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
        {isLogin ? <LoginForm /> : <RegisterForm />}
        <div className={styles.switchButton} onClick={switchMode}>
          {isLogin ? 'No account? Sign up here' : 'Login here'}
        </div>
      </div>
    </div>
  );
};
