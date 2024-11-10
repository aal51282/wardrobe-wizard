import { Suspense } from "react";
import { RegisterForm } from "@/components/custom/auth/register-form";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function RegisterPage() {
  return (
    <div
      className="min-h-screen bg-gradient-to-b from-white to-[#F9F6E8]/30 
                    flex items-center justify-center px-4 py-12"
    >
      <Suspense fallback={<LoadingSpinner />}>
        <RegisterForm />
      </Suspense>
    </div>
  );
}
