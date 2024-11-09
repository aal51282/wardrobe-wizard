import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";

const recentOutfits = [
  { id: 1, name: "Casual Friday", image: "/placeholder-outfit-1.jpg" },
  { id: 2, name: "Weekend Brunch", image: "/placeholder-outfit-2.jpg" },
  { id: 3, name: "Business Meeting", image: "/placeholder-outfit-3.jpg" },
  { id: 4, name: "Evening Out", image: "/placeholder-outfit-4.jpg" },
  { id: 5, name: "Summer Day", image: "/placeholder-outfit-5.jpg" },
  { id: 6, name: "Workout Ready", image: "/placeholder-outfit-6.jpg" },
  { id: 7, name: "Date Night", image: "/placeholder-outfit-7.jpg" },
];

export function RecentOutfits() {
  return (
    <Card className="border-[#D4AF37] bg-white shadow-[#D4AF37]/10">
      <CardHeader>
        <CardTitle className="text-[#D4AF37] text-2xl">Recent Outfits</CardTitle>
      </CardHeader>
      <CardContent>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {recentOutfits.map(({ id, name, image }) => (
              <CarouselItem key={id} className="pl-2 md:pl-4 basis-1/4">
                <div
                  className="group relative aspect-square rounded-md overflow-hidden cursor-pointer
                           border border-[#D4AF37] hover:border-[#B4941F] transition-colors"
                >
                  <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/60 to-transparent 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="absolute bottom-2 left-2 text-white font-medium">
                      {name}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-[#D4AF37] hover:bg-[#F9F6E8] border-[#D4AF37]" />
          <CarouselNext className="text-[#D4AF37] hover:bg-[#F9F6E8] border-[#D4AF37]" />
        </Carousel>
      </CardContent>
    </Card>
  );
} 