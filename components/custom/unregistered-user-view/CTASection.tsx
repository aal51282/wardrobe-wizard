import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <div className="text-center my-16">
      <div className="flex gap-4 items-center justify-center">
        <Button 
          size="lg" 
          className="bg-[#b38c5a] hover:bg-[#a77e3e] px-8 py-6 text-lg"
          asChild
        >
          <Link href="/register">Get Started Free</Link>
        </Button>
        <Button 
          size="lg" 
          variant="outline" 
          className="border-amber-600 text-amber-600 hover:bg-amber-50 px-8 py-6 text-lg"
          asChild
        >
          <Link href="/login">Login</Link>
        </Button>
      </div>
    </div>
  );
}
