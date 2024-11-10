"use client";

import { Award, PieChart, Sun, Repeat } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface MetricsGridProps {
  metrics: {
    styleScore: number;
    colorHarmony: number;
    seasonalMatch: number;
    versatility: number;
  };
}

export function MetricsGrid({ metrics }: MetricsGridProps) {
  const metricsData = [
    { title: "Style Score", value: metrics.styleScore, icon: Award },
    { title: "Color Harmony", value: metrics.colorHarmony, icon: PieChart },
    { title: "Seasonal Match", value: metrics.seasonalMatch, icon: Sun },
    { title: "Versatility", value: metrics.versatility, icon: Repeat },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {metricsData.map((metric) => (
        <Card key={metric.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
            <metric.icon className="h-4 w-4 text-[#D4AF37]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}/100</div>
            <Progress value={metric.value} className="mt-2" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 