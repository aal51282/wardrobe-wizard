import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Register.module.css';

export default function RegisterPage() {
  const router = useRouter();

  // State for form inputs
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // Function to handle form submission
  const handleRegister = () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Placeholder: Code to add user to the database will go here
    console.log(`Creating user: ${firstName} ${lastName}, Email: ${email}`);

    // Redirect to the login page after successful registration
    router.push('/login');
  };

  return (
    <div className={styles.registerContainer}>
      <h1>Register</h1>
      <div className={styles.inputSection}>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          className={styles.input}
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          className={styles.input}
        />

        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          className={styles.input}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className={styles.input}
        />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          className={styles.input}
        />

        {/* Error message if required fields are missing or passwords don't match */}
        {error && <p className={styles.error}>{error}</p>}

        <button onClick={handleRegister} className={styles.submitButton}>
          Register
        </button>
      </div>
    </div>
  );
}

