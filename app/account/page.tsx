import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Account.module.css';

export default function AccountPage() {
  const router = useRouter();

  // State for user data and photo upload
  const [profilePhoto, setProfilePhoto] = useState('/images/default-profile.png'); // Default profile photo
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  // Function to handle profile photo change
  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Placeholder: Upload photo to the database and update profilePhoto URL
      const photoURL = URL.createObjectURL(file);
      setProfilePhoto(photoURL);
      console.log("Photo uploaded:", file.name);
    }
  };

  // Function to handle password update
  const handlePasswordUpdate = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    // Placeholder: Update password in the database
    console.log("Password updated to:", newPassword);
    alert("Password updated successfully.");
    setShowPasswordFields(false);
    setNewPassword('');
    setConfirmPassword('');
  };

  // Function to handle account deletion
  const handleDeleteAccount = () => {
    const confirmed = window.confirm("Are you sure you want to delete your account?");
    if (confirmed) {
      // Placeholder: Delete account from the database
      console.log("Account deleted.");
      alert("Your account has been deleted.");
      router.push('/'); // Redirect to home or login after deletion
    }
  };

  return (
    <div className={styles.accountContainer}>
      {/* Profile Photo */}
      <div className={styles.profilePhotoContainer}>
        <img src={profilePhoto} alt="Profile" className={styles.profilePhoto} />
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          className={styles.photoUpload}
        />
      </div>

      {/* User Information */}
      <div className={styles.infoContainer}>
        <p><strong>Username:</strong> User's Username</p>
        <p><strong>Email:</strong> user@example.com</p>
      </div>

      {/* Update Password Section */}
      <div className={styles.updatePasswordSection}>
        <button onClick={() => setShowPasswordFields(!showPasswordFields)} className={styles.updatePasswordButton}>
          Update Password
        </button>
        {showPasswordFields && (
          <div className={styles.passwordFields}>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={styles.input}
            />
            <button onClick={handlePasswordUpdate} className={styles.submitButton}>
              Save Password
            </button>
          </div>
        )}
      </div>

      {/* Download Data Button (Placeholder) */}
      <button className={styles.downloadButton}>
        Download Your Data
      </button>
      
      {/* Delete Account Button */}
      <button onClick={handleDeleteAccount} className={styles.deleteButton}>
        Delete Account
      </button>

      {/* Back Button */}
      <button onClick={() => router.push('/user-view')} className={styles.backButton}>
        Back
      </button>
    </div>
  );
}
