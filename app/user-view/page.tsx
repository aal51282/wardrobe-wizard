// Import necessary libraries and hooks
import Image from 'next/image';
import { useState } from 'react';
import styles from './UserView.module.css';

export default function UserViewPage() {
  // Placeholder state for user data and cart items
  const [userData, setUserData] = useState({
    username: "User's Name", // This will be dynamically set once database is integrated
    password: "User's Password", // Also a Placeholder!
  });
  const [cartItems, setCartItems] = useState([]); // Placeholder for user's cart items, this is a lot of Placeholders

  // State to control dropdown visibility
  // I thought for account and cart, a drop down menu would look the cleanest
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [showCartDropdown, setShowCartDropdown] = useState(false);

  // Function to handle Continue button click (redirect to Product page)
  const handleContinue = () => {
    window.location.href = '/product';
  };

  return (
    <div className={styles.userViewContainer}>
      {/* Header Section */}
      <header className={styles.header}>
        <div className={styles.userName}>{userData.username}</div>
        
        {/* Navigation Links */}
        <nav className={styles.navLinks}>
          <a href="#">Watches</a>
          <a href="#">Eyewear</a>
          <a href="#">Jewelry</a>
          <a href="#">Essentials</a>
          <a href="#">Gifting</a>
          <a href="#">Brand</a>
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
                  <p key={index}>{item.name}</p> // Replace with actual item names from database I guess this will be from the User's database? -G
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
