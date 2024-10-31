// Import necessary libraries and hooks
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './UserView.module.css';

export default function UserViewPage() {
  const router = useRouter();

  // Placeholder state for user data and cart items
  const [userData, setUserData] = useState({
    username: "User's Name", // This will be dynamically set once database is integrated
    password: "User's Password", // Placeholder
  });
  const [cartItems, setCartItems] = useState([]); // Placeholder for user's cart items

  // State to control dropdown visibility for Account and Cart
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [showCartDropdown, setShowCartDropdown] = useState(false);

  // Function to handle Continue button click (redirect to Product page)
  const handleContinue = () => {
    router.push('/product');
  };

  return (
    <div className={styles.userViewContainer}>
      {/* Header Section */}
      <header className={styles.header}>
        <div className={styles.userName}>{userData.username}</div>
        
        {/* Updated Navigation Links: Upload Clothing and Meet the Team */}
        <nav className={styles.navLinks}>
          <a href="/upload">Upload Clothing</a>
          <span className={styles.verticalLine}></span> {/* Vertical line separator */}
          <a href="/project-team">Meet the Team</a>
        </nav>

        {/* Account Dropdown */}
        <div className={styles.accountContainer}>
          <button onClick={() => setShowAccountDropdown(!showAccountDropdown)}>
            Account <span>👤</span>
          </button>
          {showAccountDropdown && (
            <div className={styles.dropdown}>
              <p>Username: {userData.username}</p>
              <p>Password: {userData.password}</p>
            </div>
          )}
        </div>

        {/* Cart Dropdown */}
        <div className={styles.cartContainer}>
          <button onClick={() => setShowCartDropdown(!showCartDropdown)}>
            Cart <span>🛒</span>
          </button>
          {showCartDropdown && (
            <div className={styles.dropdown}>
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <p key={index}>{item.name}</p> // Replace with actual item names from database
                ))
              ) : (
                <p>Your cart is empty.</p>
              )}
            </div>
          )}
        </div>
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

