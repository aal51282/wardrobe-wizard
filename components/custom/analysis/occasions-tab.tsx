"use client";

import { Tag, Cloud, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface OccasionsTabProps {
  occasionMatch: string;
  weatherSuitability: string;
}

export function OccasionsTab({ occasionMatch, weatherSuitability }: OccasionsTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Occasion Suitability</CardTitle>
        <CardDescription>Where and when to wear this outfit</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <Tag className="h-4 w-4 text-[#D4AF37]" />
            <span>Best for: {occasionMatch}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Cloud className="h-4 w-4 text-[#D4AF37]" />
            <span>Weather: {weatherSuitability}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-[#D4AF37]" />
            <span>Time of Day: Any</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 