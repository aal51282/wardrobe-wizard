import { Suspense } from "react";
import { UploadClothingForm } from "@/components/custom/upload/upload-clothing-form";
import { UploadNavigationCard } from "@/components/custom/upload/upload-navigation-card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function UploadClothingPage() {
  return (
    <div
      className="min-h-screen bg-gradient-to-b from-white to-[#F9F6E8]/30 
                    flex flex-col items-center justify-center px-4 py-12"
    >
      <Suspense fallback={<LoadingSpinner />}>
        <UploadClothingForm />
        <UploadNavigationCard />
      </Suspense>
    </div>
  );
}
