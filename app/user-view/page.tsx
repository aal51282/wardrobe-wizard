"use client";

import { Suspense } from 'react';
import { Header } from '@/components/custom/user-view/user-view-header';
import { WelcomeSection } from '@/components/custom/user-view/welcome-section';
import { RecentOutfits } from '@/components/custom/user-view/recent-outfits';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function UserViewPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="px-8 min-h-[calc(100vh-64px)] flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
          <WelcomeSection />
          
          <Suspense fallback={<LoadingSpinner />}>
            <RecentOutfits />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
