import { useState } from 'react';
import styles from './ResetPassword.module.css';

export default function ResetPasswordPage() {
  // State for tracking user input and page flow
  const [loginName, setLoginName] = useState('');
  const [isUserValid, setIsUserValid] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  // Function to handle login name submission
  const handleLoginNameSubmit = () => {
    // Placeholder: Check if loginName exists in the database
    if (loginName === "existingUser") { // once again, placeholder
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
  };
  // There is absolutely no Verification in this reset page, like zip, nada
  // So this is something to look into later down the line when we have the rest of the project up
  // -G
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
