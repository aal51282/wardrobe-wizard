import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function WelcomeSection() {
  return (
    <section className="flex flex-col justify-center space-y-8 animate-fade-in">
      <div className="space-y-4">
        <h1 className="text-5xl md:text-6xl font-bold">
          <span className="text-[#D4AF37]">Welcome back,</span>
          <br />
          <span className="text-[#B4941F] inline-block mt-2">Username</span>
        </h1>
        <p className="text-xl md:text-2xl text-[#D4AF37]/80">
          Ready to create your next perfect outfit?
        </p>
      </div>
      
      <Button
        size="lg"
        className="bg-[#D4AF37] hover:bg-[#B4941F] text-white px-8 py-7 text-lg
                   w-fit transform transition-all duration-200 hover:scale-105
                   shadow-lg hover:shadow-[#D4AF37]/20"
        onClick={() => window.location.href = '/product'}
      >
        Get Started
        <ArrowRight className="ml-2 h-6 w-6 animate-bounce-x" />
      </Button>
    </section>
  );
}
