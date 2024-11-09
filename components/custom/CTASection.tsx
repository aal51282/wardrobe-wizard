import Link from 'next/link';
import { Button } from "@/components/ui/button";
import styles from '../../app/Page.module.css';

export function CTASection() {
  return (
    <div className={styles.ctaSection}>
      <Button size="lg" className={styles.ctaButton} asChild>
        <Link href="/register">Get Started Free</Link>
      </Button>
      <p className={styles.ctaSubtext}>No credit card required</p>
    </div>
  );
}