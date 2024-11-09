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
    <Card className="border-[#D4AF37] bg-white/80 backdrop-blur-sm shadow-xl
                    hover:shadow-2xl transition-shadow duration-300
                    animate-fade-in">
      <CardHeader className="space-y-2">
        <CardTitle className="text-[#D4AF37] text-3xl font-bold flex items-center gap-2">
          Recent Outfits
          <span className="text-sm font-normal bg-[#D4AF37]/10 px-3 py-1 rounded-full">
            {recentOutfits.length} outfits
          </span>
        </CardTitle>
        <p className="text-[#D4AF37]/70 text-sm">
          Swipe to explore your latest creations
        </p>
      </CardHeader>
      <CardContent className="p-6">
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
                  className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer
                           border border-[#D4AF37] hover:border-[#B4941F] transition-all duration-300
                           shadow-md hover:shadow-lg hover:scale-[1.02]"
                >
                  <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    priority={id <= 4} // Prioritize loading first 4 images
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/80 to-transparent 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="absolute bottom-3 left-3 text-white font-medium tracking-wide">
                      {name}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-[#D4AF37] hover:bg-[#F9F6E8] border-[#D4AF37]
                                     -left-4 hover:scale-110 transition-transform" />
          <CarouselNext className="text-[#D4AF37] hover:bg-[#F9F6E8] border-[#D4AF37]
                                 -right-4 hover:scale-110 transition-transform" />
        </Carousel>
      </CardContent>
    </Card>
  );
} 