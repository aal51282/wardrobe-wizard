"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ArrowRight } from "lucide-react";

export function UploadNavigationCard() {
  return (
    <Card className="w-full max-w-md border-[#D4AF37]/20 shadow-lg mt-6">
      <CardContent className="flex justify-between items-center gap-4 p-6">
        <Link href="/registered-user-view" className="flex-1">
          <Button
            variant="outline"
            className="w-full border-[#D4AF37] text-[#D4AF37] 
                     hover:bg-[#D4AF37]/10 transition-colors"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>

        <Link href="/create-outfit" className="flex-1">
          <Button
            className="w-full bg-[#D4AF37] hover:bg-[#B4941F] text-white 
                     transition-colors"
          >
            Proceed to Products
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
