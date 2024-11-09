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
                    animate-fade-in sticky top-24 h-[400px]">
      <CardHeader className="text-center py-3">
        <CardTitle className="text-xl font-bold text-[#D4AF37]">
          How It Works
        </CardTitle>
        <p className="text-[#D4AF37]/70 text-xs mt-1">
          Transform your wardrobe in three simple steps
        </p>
      </CardHeader>
      <CardContent className="grid gap-3.5 px-4 h-[calc(100%-88px)] place-content-between">
        {steps.map(({ title, description, icon: Icon, animation }, index) => (
          <div
            key={title}
            className="group relative flex items-center gap-4 p-3.5 rounded-lg
                     border border-[#D4AF37] hover:border-[#B4941F]
                     bg-white/50 hover:bg-[#F9F6E8] transition-all duration-300
                     hover:shadow-lg cursor-pointer"
          >
            <div className={`
              flex h-8 w-8 shrink-0 items-center justify-center rounded-full
              bg-[#D4AF37]/10 group-hover:bg-[#D4AF37]/20 transition-all duration-300
              mt-0.5
            `}>
              <Icon 
                className={`h-4.5 w-4.5 text-[#D4AF37] transition-all duration-300 ${animation}`}
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full
                               bg-[#D4AF37] text-white text-xs font-medium">
                  {index + 1}
                </span>
                <h3 className="font-semibold text-[15px] text-[#D4AF37]">
                  {title}
                </h3>
              </div>
              <p className="text-[#D4AF37]/70 text-sm leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
