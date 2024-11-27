import { Header } from "@/components/custom/unregistered-user-view/Header";
import { HeroSection } from "@/components/custom/unregistered-user-view/HeroSection";
import { FeatureGrid } from "@/components/custom/unregistered-user-view/FeatureGrid";
import { CTASection } from "@/components/custom/unregistered-user-view/CTASection";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#fff8e6] to-white">
      <Header />
      <main className="pt-24 px-4">
        <HeroSection />
        <FeatureGrid />
        <CTASection />
      </main>
    </div>
  );
}
