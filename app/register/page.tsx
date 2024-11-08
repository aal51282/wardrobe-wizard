"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Register.module.css';

export default function RegisterPage() {
  const router = useRouter();

  // State for form inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');

  // Function to handle form submission
  const handleRegister = () => {
    if (!username || !password || !email || !firstName || !lastName) {
      setError("All fields are required.");
      return;
    }

    // Placeholder: Code to add user to the database will go here
    console.log(`Creating user: ${username}, Email: ${email}`);

    // Redirect to the login page after successful registration
    router.push('/login');
  };

  return (
    <div className={styles.registerContainer}>
      <h1 className={styles.registerTitle}>Register</h1>
      <div className={styles.inputSection}>
        <label htmlFor="firstName" className={styles.inputLabel}>First Name</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          className={styles.input}
        />

        <label htmlFor="lastName" className={styles.inputLabel}>Last Name</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          className={styles.input}
        />

        <label htmlFor="username" className={styles.inputLabel}>Login Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className={styles.input}
        />

        <label htmlFor="password" className={styles.inputLabel}>Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className={styles.input}
        />

        <label htmlFor="email" className={styles.inputLabel}>Email Address</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          className={styles.input}
        />

        {/* Error message if required fields are missing */}
        {error && <p className={styles.errorMessage}>{error}</p>}

        <button onClick={handleRegister} className={styles.submitButton}>
          Register
        </button>
      </div>
    </div>
  );
}
