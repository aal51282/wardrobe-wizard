import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import styles from "../../app/Page.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logoContainer}>
          <Image
            src="/logo.png"
            alt="Wardrobe Wizard Logo"
            width={40}
            height={40}
            className={styles.logo}
          />
          <h1 className={styles.title}>Wardrobe Wizard</h1>
        </div>
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
