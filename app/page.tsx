import { Header } from "@/components/shared/Header";
import { HeroSection } from "@/components/custom/Splash/HeroSection";
import { FeatureGrid } from "@/components/custom/Splash/FeatureGrid";
import { CTASection } from "@/components/custom/Splash/CTASection";
import styles from "./Page.module.css";

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
