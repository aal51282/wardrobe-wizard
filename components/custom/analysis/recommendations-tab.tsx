"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Recommendation {
  type: string;
  suggestion: string;
  reason: string;
}

interface RecommendationsTabProps {
  recommendations: Recommendation[];
}

export function RecommendationsTab({
  recommendations,
}: RecommendationsTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Style Recommendations</CardTitle>
        <CardDescription>Suggestions to enhance your outfit</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div
                key={index}
                className="p-6 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-lg text-[#D4AF37] mb-2">
                  {rec.type}
                </h3>
                <p className="text-base text-gray-700 mb-2">{rec.suggestion}</p>
                <p className="text-sm text-gray-500 italic">{rec.reason}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
