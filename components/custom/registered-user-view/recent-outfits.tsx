"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface OutfitItem {
  _id: string;
  name: string;
  items: {
    imageUrls: string[];
    category: string;
  }[];
  createdAt: string;
}

export function RecentOutfits() {
  const [outfits, setOutfits] = useState<OutfitItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOutfits = async () => {
      try {
        const response = await fetch("/api/outfits");
        if (!response.ok) throw new Error("Failed to fetch outfits");
        const data = await response.json();
        setOutfits(data);
      } catch (error) {
        console.error("Error fetching outfits:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOutfits();
  }, []);

  if (isLoading) {
    return (
      <Card className="border-[#D4AF37] bg-white/80 backdrop-blur-sm shadow-xl">
        <CardContent className="flex justify-center items-center h-[300px]">
          <LoadingSpinner />
        </CardContent>
      </Card>
    );
  }

  if (outfits.length === 0) {
    return (
      <Card className="border-[#D4AF37] bg-white/80 backdrop-blur-sm shadow-xl">
        <CardHeader className="space-y-2">
          <CardTitle className="text-[#D4AF37] text-xl font-bold">
            Recent Outfits
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-[200px] text-gray-500">
          No outfits created yet. Start creating your first outfit!
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-[#D4AF37] bg-white/80 backdrop-blur-sm shadow-xl
                    hover:shadow-2xl transition-shadow duration-300
                    animate-fade-in">
      <CardHeader className="space-y-2">
        <CardTitle className="text-[#D4AF37] text-xl font-bold flex items-center gap-2">
          Recent Outfits
          <span className="text-sm font-normal bg-[#D4AF37]/10 px-3 py-1 rounded-full">
            {outfits.length} outfits
          </span>
        </CardTitle>
        <p className="text-[#D4AF37]/70 text-xs">
          Swipe to explore your latest creations
        </p>
      </CardHeader>
      <CardContent className="px-3 pb-6">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {outfits.map((outfit) => (
              <CarouselItem key={outfit._id} className="pl-2 md:pl-4 basis-1/4">
                <div
                  className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer
                           border border-[#D4AF37] hover:border-[#B4941F] transition-all duration-300
                           shadow-md hover:shadow-lg hover:scale-[1.02]"
                >
                  {/* Display the first image from the first item in the outfit */}
                  {outfit.items[0] && (
                    <Image
                      src={outfit.items[0].imageUrls[0]}
                      alt={outfit.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, 25vw"
                      priority
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/80 to-transparent 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-3 left-3 right-3">
                      <p className="text-white font-medium tracking-wide mb-1">
                        {outfit.name}
                      </p>
                      <p className="text-white/80 text-xs">
                        {outfit.items.length} items • {new Date(outfit.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-[#D4AF37] hover:bg-[#F9F6E8] border-[#D4AF37]
                                     -left-4 hover:scale-110 transition-transform scale-90
                                     h-8 w-8" />
          <CarouselNext className="text-[#D4AF37] hover:bg-[#F9F6E8] border-[#D4AF37]
                                 -right-4 hover:scale-110 transition-transform scale-90
                                 h-8 w-8" />
        </Carousel>
      </CardContent>
    </Card>
  );
} 