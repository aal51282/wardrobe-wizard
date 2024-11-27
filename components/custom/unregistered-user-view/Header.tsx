import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import styles from "@/app/Page.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link href="/" className={styles.logoContainer}>
          <div className="flex items-center cursor-pointer">
            <Image
              src="/big-logo.png"
              alt="Wardrobe Wizard Logo"
              width={40}
              height={40}
              className={styles.logo}
            />
            <h1 className={`ml-3 ${styles.title}`}>Wardrobe Wizard</h1>
          </div>
        </Link>
        <nav className={styles.navLinks}></nav>
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
