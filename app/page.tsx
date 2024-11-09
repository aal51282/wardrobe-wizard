import { Header } from '@/components/custom/Header';
import { HeroSection } from '@/components/custom/HeroSection';
import { FeatureGrid } from '@/components/custom/FeatureGrid';
import { CTASection } from '@/components/custom/CTASection';
import styles from './Page.module.css';

export default function HomePage() {
  return (
    <div className={styles.homePageContainer}>
      <Header />
      <main className={styles.mainContent}>
        <HeroSection />
        <FeatureGrid />
        <CTASection />
      </main>
    </div>
  );
}
