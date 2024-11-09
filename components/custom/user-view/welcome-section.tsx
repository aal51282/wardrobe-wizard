import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function WelcomeSection() {
  return (
    <section className="flex flex-col justify-center h-full">
      <h1 className="text-5xl md:text-6xl font-bold text-[#D4AF37] mb-6">
        Welcome back, <span className="text-[#B4941F]">Username</span>
      </h1>
      <p className="text-xl md:text-2xl text-[#D4AF37]/80 mb-8">
        Ready to create your next perfect outfit?
      </p>
      <Button
        size="lg"
        className="bg-[#D4AF37] hover:bg-[#B4941F] text-white px-8 py-6 text-lg w-fit"
        onClick={() => window.location.href = '/product'}
      >
        Get Started
        <ArrowRight className="ml-2 h-6 w-6" />
      </Button>
    </section>
  );
}
