"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export function WelcomeSection() {
  const router = useRouter();
  const { data: session } = useSession();
  const firstName = session?.user?.name?.split(' ')[0] || "User";

  return (
    <section
      className="flex flex-col items-center text-center justify-center 
                      space-y-8 animate-fade-in max-w-4xl mx-auto"
    >
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-[#D4AF37]">
          Welcome, {firstName}!
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Ready to organize your wardrobe? Start by uploading your clothes or
          creating your first outfit.
        </p>
      </div>

      <Button
        size="lg"
        className="bg-[#D4AF37] hover:bg-[#B4941F] text-white px-10 py-8 text-xl
                   w-fit transform transition-all duration-200 hover:scale-105
                   shadow-lg hover:shadow-[#D4AF37]/20"
        onClick={() => router.push("/upload")}
      >
        Get Started
        <ArrowRight className="ml-2 h-7 w-7 animate-bounce-x" />
      </Button>
    </section>
  );
}
