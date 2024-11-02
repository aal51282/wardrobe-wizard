// Import necessary libraries and hooks
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './UserView.module.css';

export default function UserViewPage() {
  const router = useRouter();

  // Placeholder state for user data
  const [userData, setUserData] = useState({
    username: "User's Name", // This will be dynamically set once database is integrated
    password: "User's Password", // Placeholder
  });

  // Function to handle Continue button click (redirect to Product page)
  const handleContinue = () => {
    router.push('/product');
  };

  return (
    <div className={styles.userViewContainer}>
      {/* Header Section */}
      <header className={styles.header}>
        <div className={styles.userName}>{userData.username}</div>
        
        {/* Navigation Links: Upload Clothing, Outfits, and Meet the Team */}
        <nav className={styles.navLinks}>
          <a href="/upload">Upload Clothing</a>
          <span className={styles.verticalLine}></span> {/* Vertical line separator */}
          <a href="/saved-outfits">Outfits</a>
          <span className={styles.verticalLine}></span> {/* Vertical line separator */}
          <a href="/project-team">Meet the Team</a>
        </nav>

        {/* Account Button - redirects to Account page */}
        <button className={styles.accountButton} onClick={() => router.push('/account')}>
          Account <span>👤</span>
        </button>
      </header>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <h1 className={styles.welcomeTitle}>Welcome to Wardrobe Wizard</h1>
        <p className={styles.tagline}>Don't Get Mad, Get Wardrobe Wizard</p>
        
        {/* Continue Button */}
        <button className={styles.continueButton} onClick={handleContinue}>
          <span>➡️</span> Continue
        </button>

        {/* Placeholder for image */}
        <div className={styles.imageContainer}>
          <Image src="/images/wardrobe.png" alt="Wardrobe Image" width={400} height={200} />
        </div>
      </main>
    </div>
  );
}
