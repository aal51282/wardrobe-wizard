import Image from 'next/image';
import styles from '../../../app/login/Login.module.css';

export function BrandSection() {
  return (
    <div className={styles.brandSection}>
      <div className={styles.brandContent}>
        <Image
          src="/logo.png"
          alt="Wardrobe Wizard"
          width={400}
          height={400}
          priority
          className={styles.brandImage}
        />
        <h1 className={styles.brandTitle}>Wardrobe Wizard</h1>
        <p className={styles.brandTagline}>Don't get mad, get Wardrobe Wizard</p>
      </div>
    </div>
  );
}