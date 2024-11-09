import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Shirt, Users } from "lucide-react";

const actions = [
  {
    title: "Upload New Items",
    description: "Add new clothing to your virtual wardrobe",
    icon: Upload,
    href: "/upload",
  },
  {
    title: "Create Outfit",
    description: "Mix and match your clothes to create new looks",
    icon: Shirt,
    href: "/create-outfit",
  },
  {
    title: "Share & Discover",
    description: "Get inspired by the community",
    icon: Users,
    href: "/community",
  },
];

export function QuickActions() {
  return (
    <Card className="border-[#D4AF37] bg-white shadow-[#D4AF37]/10">
      <CardHeader>
        <CardTitle className="text-[#D4AF37]">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {actions.map(({ title, description, icon: Icon, href }) => (
          <Button
            key={title}
            variant="outline"
            className="h-auto flex items-start p-4 justify-start border-[#D4AF37] 
                     hover:bg-[#F9F6E8] hover:border-[#B4941F]"
            onClick={() => (window.location.href = href)}
          >
            <Icon className="h-5 w-5 mr-4 text-[#D4AF37]" />
            <div className="text-left">
              <h3 className="font-semibold text-[#D4AF37]">{title}</h3>
              <p className="text-sm text-[#D4AF37]/70">{description}</p>
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
