"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ArrowRight } from "lucide-react";

export function UploadNavigationCard() {
  const router = useRouter();

  return (
    <Card className="w-full max-w-md border-[#D4AF37]/20 shadow-lg mt-6">
      <CardContent className="flex justify-between items-center gap-4 p-6">
        <Button
          onClick={() => router.push("/user-view")}
          variant="outline"
          className="flex-1 border-[#D4AF37] text-[#D4AF37] 
                   hover:bg-[#D4AF37]/10 transition-colors"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        
        <Button
          onClick={() => router.push("/product")}
          className="flex-1 bg-[#D4AF37] hover:bg-[#B4941F] text-white 
                   transition-colors"
        >
          Proceed to Products
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
} 