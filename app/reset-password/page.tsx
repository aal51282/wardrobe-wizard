import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './ResetPassword.module.css';

export default function ResetPasswordPage() {
  const router = useRouter();

  // State for tracking user input and page flow
  const [loginName, setLoginName] = useState('');
  const [isUserValid, setIsUserValid] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  // Function to handle login name submission
  const handleLoginNameSubmit = () => {
    // Placeholder: Check if loginName exists in the database
    // Example: replace with actual database call
    if (loginName === "existingUser") { // Mock validation
      setIsUserValid(true); // User is valid
    } else {
      alert("User does not exist.");
    }
  };

  // Function to handle new password submission
  const handlePasswordReset = () => {
    // Placeholder: Update the user's password in the database
    console.log(`Password for ${loginName} updated to: ${newPassword}`);
    alert("Password has been reset successfully!");

    // Redirect to the login page after successful password reset
    router.push('/login');
  };
  // I know theres low security here, I just wanted to get this down pact and worry about safety later
  // Maybe we can look into email sending / hiding the password when its typed out -G
  return (
    <div className={styles.resetPasswordContainer}>
      <h1>Reset Password</h1>
      
      {!isUserValid ? (
        // Step 1: Ask for the login name
        <div className={styles.inputSection}>
          <label htmlFor="loginName">Enter your login name:</label>
          <input
            type="text"
            id="loginName"
            value={loginName}
            onChange={(e) => setLoginName(e.target.value)}
            placeholder="Login Name"
            className={styles.input}
          />
          <button onClick={handleLoginNameSubmit} className={styles.submitButton}>
            Submit
          </button>
        </div>
      ) : (
        // Step 2: Ask for the new password
        <div className={styles.inputSection}>
          <label htmlFor="newPassword">Enter your new password:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            className={styles.input}
          />
          <button onClick={handlePasswordReset} className={styles.submitButton}>
            Reset Password
          </button>
        </div>
      )}
    </div>
  );
}
