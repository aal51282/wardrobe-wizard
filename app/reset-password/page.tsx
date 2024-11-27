import { Suspense } from "react";
import { RequestResetForm } from "@/components/custom/auth/request-reset-form";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Header } from "@/components/custom/unregistered-user-view/Header";

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-white to-[#F9F6E8]/30 
                    flex items-center justify-center px-4 py-12 flex-1">
        <Suspense fallback={<LoadingSpinner />}>
          <RequestResetForm />
        </Suspense>
      </div>
    </div>
  );
}
