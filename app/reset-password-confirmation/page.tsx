import { Suspense } from "react";
import { ConfirmResetForm } from "@/components/custom/auth/confirm-reset-form";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Header } from "@/components/custom/unregistered-user-view/Header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ResetPasswordConfirmationPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-white to-[#F9F6E8]/30 
                    flex flex-col items-center justify-center px-4 py-12">
        <Suspense fallback={<LoadingSpinner />}>
          <ConfirmResetForm />
        </Suspense>
        
        <Button
          variant="outline"
          className="mt-6 text-amber-600 border-amber-600 hover:bg-amber-50"
          asChild
        >
          <Link href="/login">Back to Login</Link>
        </Button>
      </div>
    </div>
  );
}
