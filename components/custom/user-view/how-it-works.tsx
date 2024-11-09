import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Upload, Wand2, LineChart } from "lucide-react";

interface StepItem {
  title: string;
  description: string;
  icon: React.ElementType;
  animation: string;
}

const steps: StepItem[] = [
  {
    title: "Upload Your Wardrobe",
    description: "Snap photos of your clothes to build your digital closet",
    icon: Upload,
    animation: "group-hover:translate-y-1",
  },
  {
    title: "Create Magic",
    description: "Let AI suggest perfect outfit combinations based on your style",
    icon: Wand2,
    animation: "group-hover:rotate-12",
  },
  {
    title: "Get Smart Insights",
    description: "Track your style preferences and get personalized recommendations",
    icon: LineChart,
    animation: "group-hover:scale-110",
  },
];

export function HowItWorks() {
  return (
    <Card className="border-[#D4AF37] bg-white/80 backdrop-blur-sm shadow-xl 
                    animate-fade-in sticky top-24">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-3xl font-bold text-[#D4AF37]">
          How It Works
        </CardTitle>
        <p className="text-[#D4AF37]/70 text-lg mt-2">
          Transform your wardrobe in three simple steps
        </p>
      </CardHeader>
      <CardContent className="grid gap-6 p-6">
        {steps.map(({ title, description, icon: Icon, animation }, index) => (
          <div
            key={title}
            className="group relative flex items-start gap-6 p-6 rounded-xl
                     border border-[#D4AF37] hover:border-[#B4941F]
                     bg-white/50 hover:bg-[#F9F6E8] transition-all duration-300
                     hover:shadow-lg cursor-pointer"
          >
            <div className={`
              flex h-12 w-12 shrink-0 items-center justify-center rounded-full
              bg-[#D4AF37]/10 group-hover:bg-[#D4AF37]/20 transition-all duration-300
            `}>
              <Icon 
                className={`h-6 w-6 text-[#D4AF37] transition-all duration-300 ${animation}`}
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full
                               bg-[#D4AF37] text-white text-sm font-medium">
                  {index + 1}
                </span>
                <h3 className="font-semibold text-xl text-[#D4AF37]">
                  {title}
                </h3>
              </div>
              <p className="text-[#D4AF37]/70 leading-relaxed">
                {description}
              </p>
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2
                          opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="text-[#D4AF37]/30 text-4xl font-bold">
                {`0${index + 1}`}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
