import { Header } from "@/components/shared/Header";
import { HeroSection } from "@/components/custom/unregistered-user-view/HeroSection";
import { FeatureGrid } from "@/components/custom/unregistered-user-view/FeatureGrid";
import { CTASection } from "@/components/custom/unregistered-user-view/CTASection";
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
