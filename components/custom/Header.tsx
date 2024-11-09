import Link from 'next/link';
import { Button } from "@/components/ui/button";
import styles from '../../app/Page.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <h1 className={styles.title}>
          Wardrobe Wizard
        </h1>
        <nav className={styles.navLinks}>
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button variant="default" className={styles.signUpButton} asChild>
            <Link href="/register">Sign Up</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}