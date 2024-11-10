import { Suspense } from "react";
import { RequestResetForm } from "@/components/custom/auth/request-reset-form";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function ResetPasswordPage() {
  return (
    <div
      className="min-h-screen bg-gradient-to-b from-white to-[#F9F6E8]/30 
                    flex items-center justify-center px-4 py-12"
    >
      <Suspense fallback={<LoadingSpinner />}>
        <RequestResetForm />
      </Suspense>
    </div>
  );
}
