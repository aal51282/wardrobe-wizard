import Link from 'next/link';
import { Button } from "@/components/ui/button";
import styles from '../../app/Page.module.css';

export function HeroSection() {
  return (
    <div className={styles.heroSection}>
      <h2 className={styles.heroTitle}>
        Transform Your Wardrobe Management Experience
      </h2>
      <p className={styles.heroSubtitle}>
        Organize, plan, and elevate your style with AI-powered wardrobe management
      </p>
    </div>
  );
}