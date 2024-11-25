import Image from "next/image";
import styles from "../../../app/login/Login.module.css";

export function BrandSection() {
  return (
    <div className={styles.brandSection}>
      <div className={styles.brandContent}>
        <Image
          src="/big-logo.png"
          alt="Wardrobe Wizard"
          width={400}
          height={400}
          priority
          className={styles.brandImage}
        />
        <h1 className={styles.brandTitle}>Wardrobe Wizard</h1>
        <p className={styles.brandTagline}>
          Hocus Pocus, Fashion Focus
        </p>
      </div>
    </div>
  );
}
