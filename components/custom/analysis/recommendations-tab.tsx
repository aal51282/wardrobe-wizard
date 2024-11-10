"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Recommendation {
  type: string;
  suggestion: string;
  reason: string;
}

interface RecommendationsTabProps {
  recommendations: Recommendation[];
}

export function RecommendationsTab({ recommendations }: RecommendationsTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Style Recommendations</CardTitle>
        <CardDescription>Suggestions to enhance your outfit</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px] pr-4">
          {recommendations.map((rec, index) => (
            <div key={index} className="mb-4 p-4 border rounded-lg">
              <h3 className="font-semibold text-[#D4AF37]">{rec.type}</h3>
              <p className="text-sm text-gray-600 mt-1">{rec.suggestion}</p>
              <p className="text-xs text-gray-500 mt-1">{rec.reason}</p>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
} 