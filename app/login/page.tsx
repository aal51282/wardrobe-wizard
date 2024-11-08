"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Login.module.css';

export default function LoginPage() {
  const router = useRouter();

  // State hooks for managing input values
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle login logic
  const handleLogin = () => {
    if (username && password) {
      console.log('Logging in...');
      console.log(`Username: ${username}`);
      console.log(`Password: ${password}`);

      // Simulate successful login and navigate to user page
      router.push('/user-view');
    } else {
      alert('Please enter both username and password.');
    }
  };

  return (
    <div className={styles.loginContainer}>
      {/* Main container for the login box */}
      <div className={styles.loginBox}>
        {/* Logo section */}
        <div className={styles.logoContainer}>
          <img src="/logo.png" alt="Wardrobe Wizard Logo" width={80} height={80} />
        </div>

        {/* Login title and subtitle */}
        <h1 className={styles.loginTitle}>Login</h1>
        <p className={styles.subtitle}>Sign in to your account</p>

        {/* Username input with icon */}
        <div className={styles.inputGroup}>
          <span className={styles.icon}>👤</span>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
          />
        </div>

        {/* Password input with icon */}
        <div className={styles.inputGroup}>
          <span className={styles.icon}>🔒</span>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
        </div>

        {/* Login button */}
        <button className={styles.loginButton} onClick={handleLogin}>Login</button>

        {/* Forgot password link */}
        <p className={styles.forgotPassword}>
          I forgot my password. <a href="/reset-password">Click here to reset</a>
        </p>

        {/* Register new account button */}
        <button
          className={styles.registerButton}
          onClick={() => router.push('/register')} // Redirect to Register page
        >
          Register new account
        </button>
      </div>
    </div>
  );
}
