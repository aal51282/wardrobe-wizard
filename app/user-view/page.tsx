"use client";

import { Suspense } from "react";
import { Header } from "@/components/custom/user-view/user-view-header";
import { WelcomeSection } from "@/components/custom/user-view/welcome-section";
import { HowItWorks } from "@/components/custom/user-view/how-it-works";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { RecentOutfits } from "@/components/custom/user-view/recent-outfits";

export default function UserViewPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F9F6E8]/30">
      <Header />
      <main className="px-8 py-12 min-h-[calc(100vh-64px)]">
        {/* Hero Section */}
        <div className="mb-24">
          <WelcomeSection />
        </div>

        {/* How It Works & Recent Outfits Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
          {/* How It Works - Takes up left side */}
          <div className="xl:col-span-1">
            <Suspense fallback={<LoadingSpinner />}>
              <HowItWorks />
            </Suspense>
          </div>

          {/* Recent Outfits - Takes up right side */}
          <div className="xl:col-span-2">
            <Suspense fallback={<LoadingSpinner />}>
              <RecentOutfits />
            </Suspense>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-10 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl" />
        </div>
      </main>
    </div>
  );
}
