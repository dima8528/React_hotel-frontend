import React, { useState, useRef } from 'react';
import styles from './authorizationPage.module.scss';
import { ReactComponent as Lock } from 'img/icons/lock.svg';
import { ReactComponent as Unlock } from 'img/icons/unlock.svg';
import { API_URL } from 'api';

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

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      localStorage.setItem('accessToken', data.accessToken);
      console.log('ok');
    } else {
      console.log('not ok');
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
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const response = await fetch(`${API_URL}/registration`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });

    if (response.ok) {
      console.log('ok');
    } else {
      console.log('not ok');
    }
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
      {error && <div className={styles.error}>{error}</div>}
      <button type="submit">Sign up</button>
      <hr className={styles.separator} />
    </form>
  );
};

export const AuthorizationPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const switchMode = () => {
    setIsLogin(!isLogin);
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
