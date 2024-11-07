// Import necessary components and hooks
import Link from 'next/link';
import styles from './HomePage.module.css';

export default function HomePage() {
  return (
    <div className={styles.homePageContainer}>
      {/* Header section */}
      <header className={styles.header}>
        <h1 className={styles.title}>Wardrobe Wizard</h1>
        <nav className={styles.navLinks}>
          <Link href="/login">Login</Link>
          <Link href="/register">Sign Up</Link>
        </nav>
      </header>

      {/* Main content section */}
      <main className={styles.mainContent}>
        <p className={styles.welcomeText}>Welcome to Wardrobe Wizard. Your go-to solution for organizing and exploring your wardrobe with ease.</p>
        <p className={styles.instructionText}>Please log in or sign up to get started!</p>
      </main>
    </div>
  );
}
