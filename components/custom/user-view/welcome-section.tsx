import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function WelcomeSection() {
  return (
    <section
      className="flex flex-col items-center text-center justify-center 
                      space-y-8 animate-fade-in max-w-4xl mx-auto"
    >
      <div className="space-y-4">
        <h1 className="text-6xl md:text-7xl font-bold">
          <span className="text-[#D4AF37]">Welcome back,</span>
          <br />
          <span className="text-[#B4941F] inline-block mt-2">Username</span>
        </h1>
        <p className="text-xl md:text-2xl text-[#D4AF37]/80 max-w-2xl mx-auto">
          Ready to create your next perfect outfit?
        </p>
      </div>

      <Button
        size="lg"
        className="bg-[#D4AF37] hover:bg-[#B4941F] text-white px-10 py-8 text-xl
                   w-fit transform transition-all duration-200 hover:scale-105
                   shadow-lg hover:shadow-[#D4AF37]/20"
        onClick={() => (window.location.href = "/product")}
      >
        Get Started
        <ArrowRight className="ml-2 h-7 w-7 animate-bounce-x" />
      </Button>
    </section>
  );
}
