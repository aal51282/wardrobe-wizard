import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Register.module.css';

export default function RegisterPage() {
  const router = useRouter();

  // State for form inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  // Function to handle form submission
  const handleRegister = () => {
    if (!username || !password || !email) {
      setError("All fields are required.");
      return;
    }

    // Placeholder: Code to add user to the database will go here
    console.log(`Creating user: ${username}, Email: ${email}`);

    // Redirect to the login page after successful registration
    router.push('/login');
  };

  // Just like the Reset Password: VERY low security in this code
  // Mess around with sending an email to verify, hiding the password when typed
  // All that good stuff, another time. -G
  return (
    <div className={styles.registerContainer}>
      <h1>Register</h1>
      <div className={styles.inputSection}>
        <label htmlFor="username">Login Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
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

        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          className={styles.input}
        />

        {/* Error message if required fields are missing */}
        {error && <p className={styles.error}>{error}</p>}

        <button onClick={handleRegister} className={styles.submitButton}>
          Register
        </button>
      </div>
    </div>
  );
}
