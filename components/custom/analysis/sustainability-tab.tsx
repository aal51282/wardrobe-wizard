"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface SustainabilityTabProps {
  sustainabilityScore: number;
  estimatedCost: string;
}

export function SustainabilityTab({
  sustainabilityScore,
  estimatedCost,
}: SustainabilityTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sustainability Metrics</CardTitle>
        <CardDescription>Environmental impact of your outfit</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span>Sustainability Score</span>
              <span className="font-bold">{sustainabilityScore}/100</span>
            </div>
            <Progress value={sustainabilityScore} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold">Estimated Cost Per Wear</h3>
              <p className="text-2xl font-bold text-[#D4AF37]">
                {estimatedCost}
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold">Materials</h3>
              <p className="text-sm text-gray-600 mt-1">
                70% Sustainable Materials
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
